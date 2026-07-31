import React, { useEffect, useState, useMemo } from "react";
import LanguageSelect from "@/components/ui/LanguageSelect";
import { useAdminDataSourcesStore } from "@/stores/adminDataSourcesStore";

const AdminDataSourcesPage: React.FC = () => {
  const {
    documents,
    isLoading,
    error,
    isUploading,
    uploadProgress,
    searchQuery,
    filterLanguage,
    filterStatus,
    filterCollection,
    stats,
    setSearchQuery,
    setFilterLanguage,
    setFilterStatus,
    setFilterCollection,
    fetchDocuments,
    uploadDocument,
    processDocument,
    processAllPending,
    deleteDocument,
  } = useAdminDataSourcesStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>("special");
  const [publishedYear, setPublishedYear] = useState<string>("");
  const [localErrorMessage, setLocalErrorMessage] = useState<string>("");
  const [collapsedCollections, setCollapsedCollections] = useState<Set<string>>(new Set());

  const toggleCollection = (collectionId: string) => {
    setCollapsedCollections(prev => {
      const next = new Set(prev);
      if (next.has(collectionId)) {
        next.delete(collectionId);
      } else {
        next.add(collectionId);
      }
      return next;
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void fetchDocuments();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, filterLanguage, filterStatus, filterCollection, fetchDocuments]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setLocalErrorMessage("");

    if (!nextFile) {
      setSelectedFile(null);
      return;
    }

    const isPdfByType = nextFile.type === "application/pdf";
    const isPdfByName = nextFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdfByType && !isPdfByName) {
      setLocalErrorMessage("Only PDF files are allowed.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(nextFile);
  };

  const handleUploadDocument = async () => {
    if (!selectedFile) {
      setLocalErrorMessage("Please select a PDF document before uploading.");
      return;
    }

    setLocalErrorMessage("");
    try {
      await uploadDocument(selectedFile, selectedLanguage, selectedCollectionId, publishedYear);
      setSelectedFile(null);
      setPublishedYear("");
    } catch (e: any) {
      setLocalErrorMessage(e.message || "Upload failed");
    }
  };

  const groupedDocuments = useMemo(() => {
    return documents.reduce((acc, doc) => {
      const colId = doc.collection_id || "Unassigned";
      if (!acc[colId]) acc[colId] = [];
      acc[colId].push(doc);
      return acc;
    }, {} as Record<string, typeof documents>);
  }, [documents]);

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-white dark:bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Data Sources
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Upload legal PDF documents, view all documents, trigger chunking and
            embedding processing, and remove documents.
          </p>
        </div>
      </section>

      {(error || localErrorMessage) && (
        <div className="rounded border border-rose-500/30 bg-rose-500/10 p-4 text-rose-600 dark:text-rose-300 text-sm">
          {error || localErrorMessage}
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600/70 dark:text-cyan-200/70">
            Total Documents
          </p>
          <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
            {stats.total}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            All uploaded legal PDFs in this source.
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600/70 dark:text-cyan-200/70">
            Processed
          </p>
          <p className="mt-3 text-2xl font-black text-emerald-600 dark:text-emerald-300">
            {stats.processed}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Documents with generated chunks and embeddings.
          </p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600/70 dark:text-cyan-200/70">
            Pending
          </p>
          <p className="mt-3 text-2xl font-black text-amber-600 dark:text-amber-300">
            {stats.pending}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Documents waiting for processing.
          </p>
        </article>
      </section>

      <section className="rounded border border-cyan-400/15 bg-white dark:bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
          Upload Legal Document (PDF)
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <input
            type="file"
            accept="application/pdf,.pdf,.docx"
            onChange={handleFileChange}
            disabled={isUploading}
            className="w-full rounded border border-cyan-400/20 bg-slate-100 dark:bg-black/30 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 file:mr-4 file:rounded file:border-0 file:bg-cyan-500/15 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-cyan-700 dark:file:text-cyan-100 hover:file:bg-cyan-500/25 disabled:opacity-50"
          />
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="w-full sm:w-1/3">
            <LanguageSelect
              value={selectedCollectionId}
              onChange={(v) => setSelectedCollectionId(v)}
              options={[
                { value: "special", label: "Special" },
                { value: "slr", label: "SLR" },
                { value: "nlr", label: "NLR" },
                { value: "sclr", label: "SCLR" },
                { value: "scoa", label: "SCOA" },
                { value: "acts", label: "Acts" },
              ]}
              ariaLabel="Select collection"
            />
            </div>
            <input
              type="number"
              placeholder="Year (e.g. 2023)"
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              className="flex w-full sm:w-1/3 min-w-32 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-800 shadow-lg shadow-black/10 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 dark:border-slate-700/70 dark:bg-[#191919] dark:text-slate-200 dark:shadow-black/20 dark:hover:border-cyan-400/20 dark:hover:bg-[#202020] placeholder:font-normal placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <div className="w-full sm:w-1/3">
            <LanguageSelect
              value={selectedLanguage}
              onChange={(v) => setSelectedLanguage(v)}
              options={[
                { value: "English", label: "English" },
                { value: "Sinhala", label: "Sinhala" },
                { value: "Tamil", label: "Tamil" },
              ]}
              ariaLabel="Select document language"
            />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleUploadDocument}
            disabled={isUploading || !selectedFile}
            className="rounded border border-cyan-400/30 bg-cyan-500/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-100 transition-colors hover:bg-cyan-500/25 disabled:opacity-50"
          >
            {isUploading ? `Uploading... (${uploadProgress}%)` : "Upload"}
          </button>
          <button
            type="button"
            onClick={processAllPending}
            disabled={stats.pending === 0}
            className="rounded border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-colors hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-700 dark:hover:text-cyan-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trigger Processing
          </button>
        </div>
        {selectedFile && (
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Selected: {selectedFile.name}
          </p>
        )}
      </section>

      <section className="rounded border border-cyan-400/15 bg-white dark:bg-[#191919] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
              All Documents
            </h3>
            {isLoading && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 animate-pulse">
                Loading...
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600/70 dark:text-cyan-200/70">
            {documents.length} entries
          </span>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <input
            type="text"
            placeholder="Search documents by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded border border-cyan-400/20 bg-slate-100 dark:bg-black/30 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
          <select
            value={filterCollection}
            onChange={(e) => setFilterCollection(e.target.value)}
            className="w-full rounded border border-cyan-400/20 bg-white dark:bg-[#191919] px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            <option value="All">All Collections</option>
            <option value="special">Special</option>
            <option value="slr">SLR</option>
            <option value="nlr">NLR</option>
            <option value="sclr">SCLR</option>
            <option value="scoa">SCOA</option>
            <option value="acts">Acts</option>
          </select>
          <select
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
            className="w-full rounded border border-cyan-400/20 bg-white dark:bg-[#191919] px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            <option value="All">All Languages</option>
            <option value="English">English</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Tamil">Tamil</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full rounded border border-cyan-400/20 bg-white dark:bg-[#191919] px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            <option value="All">All Statuses</option>
            <option value="Processed">Processed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-left text-[10px] uppercase tracking-widest text-cyan-600/70 dark:text-cyan-200/70">
                <th className="px-3 py-3 font-semibold">Document Name</th>
                <th className="px-3 py-3 font-semibold">Language</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold">Upload Date</th>
                <th className="px-3 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedDocuments).length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-xs text-slate-400 dark:text-slate-500"
                  >
                    No documents found. Upload a PDF above.
                  </td>
                </tr>
              )}
              {Object.entries(groupedDocuments).map(([collectionId, docs]) => {
                const isCollapsed = collapsedCollections.has(collectionId);
                return (
                <React.Fragment key={collectionId}>
                  <tr
                    className="border-b border-cyan-400/20 bg-cyan-500/5 dark:bg-cyan-900/10 cursor-pointer hover:bg-cyan-500/10 dark:hover:bg-cyan-900/20 transition-colors"
                    onClick={() => toggleCollection(collectionId)}
                  >
                    <td colSpan={5} className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
                      <div className="flex items-center gap-2">
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? "-rotate-90" : "rotate-0"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        {collectionId}
                      </div>
                    </td>
                  </tr>
                  {!isCollapsed && docs.map((document) => (
                    <tr key={document.id} className="border-b border-slate-100 dark:border-white/5">
                      <td className="px-3 py-3 text-slate-700 dark:text-slate-200 pl-6">{document.title}</td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                        {document.language}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                            document.status === "Processed"
                              ? "bg-green-500/15 text-green-600 dark:text-green-400"
                              : document.status === "Failed"
                                ? "bg-red-500/15 text-red-600 dark:text-red-400"
                                : "bg-amber-500/15 text-amber-600 dark:text-amber-300"
                          }`}
                        >
                          {document.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-slate-500 dark:text-slate-400">
                        {new Date(document.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => processDocument(document.id)}
                            disabled={document.status === "Processed"}
                            className="rounded border border-cyan-400/25 bg-cyan-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-100 transition-colors hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Process
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteDocument(document.id)}
                            className="rounded border border-red-400/30 bg-red-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-600 dark:text-red-300 transition-colors hover:bg-red-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDataSourcesPage;
