import React from "react";

interface MarkdownTextProps {
  content: string;
  className?: string;
}

type Block =
  | { type: "paragraph"; lines: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "unordered-list"; items: string[] }
  | { type: "heading"; level: number; text: string };

const INLINE_PATTERN =
  /(\*\*[^*]+\*\*|__[^_]+__|\*[^*\n]+\*|_[^_\n]+_|\[[^\]]+\]\([^)]+\)|\[Source:[^\]]+\])/g;

const renderInline = (text: string): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_PATTERN)) {
    const token = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(<strong key={`${index}-bold`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("__") && token.endsWith("__")) {
      nodes.push(<strong key={`${index}-bold`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*") && token.endsWith("*")) {
      nodes.push(<em key={`${index}-italic`}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("_") && token.endsWith("_")) {
      nodes.push(<em key={`${index}-italic`}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("[Source:") && token.endsWith("]")) {
      nodes.push(
        <span key={`${index}-source`} className="inline-flex items-center gap-1 rounded-md bg-slate-200/60 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-700/60 dark:text-slate-300 mx-1 border border-slate-300/50 dark:border-slate-600/50">
          <span className="material-symbols-outlined text-[12px]">library_books</span>
          {token.slice(8, -1).trim()}
        </span>
      );
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        nodes.push(
          <a
            key={`${index}-link`}
            href={linkMatch[2]}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-cyan-600 underline decoration-cyan-400/60 underline-offset-2 hover:text-cyan-500"
          >
            {linkMatch[1]}
          </a>,
        );
      } else {
        nodes.push(token);
      }
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

const parseBlocks = (content: string): Block[] => {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  const isOrderedItem = (value: string): boolean => /^\d+\.\s+/.test(value);
  const isUnorderedItem = (value: string): boolean => /^[-*]\s+/.test(value);

  const consumeList = (type: "ordered-list" | "unordered-list") => {
    const items: string[] = [];

    while (index < lines.length) {
      const currentLine = lines[index].trimEnd();

      if (!currentLine.trim()) {
        index += 1;
        continue;
      }

      const currentMatch =
        type === "ordered-list"
          ? currentLine.match(/^(\d+)\.\s+(.*)$/)
          : currentLine.match(/^[-*]\s+(.*)$/);

      if (!currentMatch) {
        break;
      }

      items.push(currentMatch[2] ?? currentMatch[1]);
      index += 1;
    }

    blocks.push({ type, items });
  };

  while (index < lines.length) {
    const line = lines[index].trimEnd();

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      index += 1;
      continue;
    }

    if (isOrderedItem(line)) {
      consumeList("ordered-list");
      continue;
    }

    if (isUnorderedItem(line)) {
      consumeList("unordered-list");
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const currentLine = lines[index].trimEnd();
      if (!currentLine.trim()) {
        break;
      }
      if (isOrderedItem(currentLine) || isUnorderedItem(currentLine) || /^#{1,6}\s+/.test(currentLine)) {
        break;
      }
      paragraphLines.push(currentLine.trim());
      index += 1;
    }

    blocks.push({ type: "paragraph", lines: paragraphLines });
  }

  return blocks;
};

const MarkdownText: React.FC<MarkdownTextProps> = ({ content, className }) => {
  const blocks = parseBlocks(content);

  return (
    <div className={className ? `${className} space-y-3` : "space-y-3"}>
      {blocks.map((block, blockIndex) => {
        if (block.type === "heading") {
          const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
          let headingClass = "font-bold text-slate-900 dark:text-white mt-6 mb-2";
          if (block.level === 1) headingClass += " text-2xl";
          else if (block.level === 2) headingClass += " text-xl";
          else if (block.level === 3) headingClass += " text-lg";
          else headingClass += " text-base";
          
          return (
            <HeadingTag key={blockIndex} className={headingClass}>
              {renderInline(block.text)}
            </HeadingTag>
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol key={blockIndex} className="ml-5 list-decimal space-y-2 pl-5">
              {block.items.map((item, itemIndex) => (
                <li
                  key={`${blockIndex}-${itemIndex}`}
                  className="pl-1 leading-6"
                >
                  {renderInline(item)}
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "unordered-list") {
          return (
            <ul key={blockIndex} className="ml-5 list-disc space-y-2 pl-5">
              {block.items.map((item, itemIndex) => (
                <li
                  key={`${blockIndex}-${itemIndex}`}
                  className="pl-1 leading-6"
                >
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );
        }

        const paragraph = block.lines.join(" ");
        return (
          <p key={blockIndex} className="leading-7 text-inherit">
            {renderInline(paragraph)}
          </p>
        );
      })}
    </div>
  );
};

export default MarkdownText;
