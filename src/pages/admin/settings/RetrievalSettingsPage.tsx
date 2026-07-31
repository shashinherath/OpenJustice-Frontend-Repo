import React, { useState, useEffect } from "react";
import { adminService, type RetrievalSettingsPayload } from "@/services/adminService";



const EMBEDDING_MODELS = [
  { value: "text-embedding-3-large", label: "Text Embedding 3 Large" },
  { value: "text-embedding-3-small", label: "Text Embedding 3 Small" },
  { value: "text-embedding-ada-002", label: "Text Embedding Ada 002" },
];

const RetrievalSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<RetrievalSettingsPayload>({
    retrieval_top_k: 5,
    retrieval_similarity_threshold: 0.7,
    retrieval_embedding_model: "text-embedding-3-large",
    retrieval_chunk_size: 1000,
    retrieval_chunk_overlap: 200,
  });

  const [saveNotice, setSaveNotice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await adminService.getRetrievalSettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch retrieval settings", error);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await adminService.updateRetrievalSettings(settings);
      setSaveNotice("Retrieval settings saved successfully.");
      setTimeout(() => setSaveNotice(""), 3000);
    } catch (error) {
      console.error(error);
      setSaveNotice("Failed to save retrieval settings.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-white dark:bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            RAG Retrieval Settings
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Configure vector database retrieval, embedding model, and chunking
            strategy for optimal knowledge base performance.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Top-K Results
          </p>
          <p className="mt-3 text-2xl font-black text-cyan-600 dark:text-cyan-400">
            {settings.retrieval_top_k}
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Similarity Threshold
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
            {(settings.retrieval_similarity_threshold * 100).toFixed(0)}%
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Chunk Size
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
            {settings.retrieval_chunk_size}
          </p>
        </article>
      </section>

      <section className="space-y-6 rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Embedding Model
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Select the embedding model for document vectorization.
          </p>
          <div className="mt-4 md:w-96">
            <select
              value={settings.retrieval_embedding_model}
              onChange={(e) =>
                setSettings({ ...settings, retrieval_embedding_model: e.target.value })
              }
              className="w-full rounded border border-slate-300 dark:border-white/10 bg-white dark:bg-[#191919] px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition-colors hover:border-cyan-400/30 focus:border-cyan-400/50 focus:outline-none"
            >
              {EMBEDDING_MODELS.map((model) => (
                <option
                  key={model.value}
                  value={model.value}
                  className="bg-white dark:bg-[#191919] text-slate-700 dark:text-slate-300"
                >
                  {model.label}
                </option>
              ))}
            </select>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Top-K Retrieval Results
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Number of top matching chunks to retrieve from vector database.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={settings.retrieval_top_k}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  retrieval_top_k: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Range: 1 - 20</span>
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300">
                {settings.retrieval_top_k}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Similarity Threshold
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Minimum cosine similarity score to include chunk in retrieval results.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.retrieval_similarity_threshold}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  retrieval_similarity_threshold: parseFloat(e.target.value),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Range: 0.0 - 1.0</span>
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300">
                {settings.retrieval_similarity_threshold.toFixed(2)}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Chunk Size
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Size of document chunks in tokens for indexing.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="128"
              max="1024"
              step="128"
              value={settings.retrieval_chunk_size}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  retrieval_chunk_size: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Range: 128 - 1024</span>
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300">
                {settings.retrieval_chunk_size}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Chunk Overlap
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Token overlap between adjacent chunks for context continuity.
          </p>
          <div className="mt-4 space-y-3 md:w-96">
            <input
              type="range"
              min="0"
              max="256"
              step="16"
              value={settings.retrieval_chunk_overlap}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  retrieval_chunk_overlap: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Range: 0 - 256</span>
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300">
                {settings.retrieval_chunk_overlap}
              </span>
            </div>
          </div>
        </article>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="rounded border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-300 transition-colors hover:bg-cyan-500/20 disabled:opacity-50"
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
