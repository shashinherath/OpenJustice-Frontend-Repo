import React, { useState } from "react";

interface RetrievalSettings {
  topK: number;
  similarityThreshold: number;
  embeddingModel: string;
  chunkSize: number;
  chunkOverlap: number;
}

const EMBEDDING_MODELS = [
  { value: "text-embedding-3-large", label: "Text Embedding 3 Large" },
  { value: "text-embedding-3-small", label: "Text Embedding 3 Small" },
  { value: "text-embedding-ada-002", label: "Text Embedding Ada 002" },
];

const RetrievalSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<RetrievalSettings>({
    topK: 5,
    similarityThreshold: 0.7,
    embeddingModel: "text-embedding-3-large",
    chunkSize: 512,
    chunkOverlap: 64,
  });

  const [saveNotice, setSaveNotice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveNotice("Retrieval settings saved successfully.");
      setTimeout(() => setSaveNotice(""), 3000);
    } catch (error) {
      setSaveNotice("Failed to save retrieval settings.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            RAG Retrieval Settings
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Configure vector database retrieval, embedding model, and chunking
            strategy for optimal knowledge base performance.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Top-K Results
          </p>
          <p className="mt-3 text-2xl font-black text-cyan-400">
            {settings.topK}
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Similarity Threshold
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {(settings.similarityThreshold * 100).toFixed(0)}%
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Chunk Size
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {settings.chunkSize}
          </p>
        </article>
      </section>

      <section className="space-y-6 rounded border border-slate-700/70 bg-[#191919] p-6">
        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Embedding Model
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Select the embedding model for document vectorization.
          </p>
          <div className="mt-4 md:w-96">
            <select
              value={settings.embeddingModel}
              onChange={(e) =>
                setSettings({ ...settings, embeddingModel: e.target.value })
              }
              className="w-full rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-cyan-400/30 focus:border-cyan-400/50 focus:outline-none"
            >
              {EMBEDDING_MODELS.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>
          </div>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Top-K Retrieval Results
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Number of top matching chunks to retrieve from vector database.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={settings.topK}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  topK: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-400">Range: 1 - 20</span>
              <span className="text-sm font-bold text-cyan-300">
                {settings.topK}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Similarity Threshold
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Minimum cosine similarity score to include chunk in retrieval results.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.similarityThreshold}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  similarityThreshold: parseFloat(e.target.value),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-400">Range: 0.0 - 1.0</span>
              <span className="text-sm font-bold text-cyan-300">
                {settings.similarityThreshold.toFixed(2)}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Chunk Size
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Size of document chunks in tokens for indexing.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="128"
              max="1024"
              step="128"
              value={settings.chunkSize}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  chunkSize: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-400">Range: 128 - 1024</span>
              <span className="text-sm font-bold text-cyan-300">
                {settings.chunkSize}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-white/10 bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Chunk Overlap
          </h3>
          <p className="mt-2 text-[10px] text-slate-400">
            Token overlap between adjacent chunks for context continuity.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="0"
              max="256"
              step="16"
              value={settings.chunkOverlap}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  chunkOverlap: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-400">Range: 0 - 256</span>
              <span className="text-sm font-bold text-cyan-300">
                {settings.chunkOverlap}
              </span>
            </div>
          </div>
        </article>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="rounded border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-300 transition-colors hover:bg-cyan-500/20 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Settings"}
          </button>
          {saveNotice && (
            <p className="text-xs font-semibold text-green-400">{saveNotice}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default RetrievalSettingsPage;
