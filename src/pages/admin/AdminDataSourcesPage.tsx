import React, { useEffect, useMemo, useState } from "react";
import LanguageSelect from "@/components/ui/LanguageSelect";
import { useAdminDataSourcesStore } from "@/stores/adminDataSourcesStore";

const AdminDataSourcesPage: React.FC = () => {
  const {
    documents,
    isLoading,
    error,
    isUploading,
    fetchDocuments,
    uploadDocument,
    processDocument,
    processAllPending,
    deleteDocument,
  } = useAdminDataSourcesStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [localErrorMessage, setLocalErrorMessage] = useState<string>("");

  useEffect(() => {
    void fetchDocuments();
  }, [fetchDocuments]);

  const processedCount = useMemo(
    () =>
      documents.filter((document) => document.status === "Processed").length,
    [documents],
  );
  const pendingCount = documents.length - processedCount;

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
      await uploadDocument(selectedFile, selectedLanguage);
      setSelectedFile(null);
    } catch (e: any) {
      setLocalErrorMessage(e.message || "Upload failed");
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-64">
        <div className="text-cyan-400 animate-pulse font-bold tracking-widest uppercase text-sm">
          Loading Data Sources...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Data Sources
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Upload legal PDF documents, view all documents, trigger chunking and
            embedding processing, and remove documents.
          </p>
        </div>
      </section>

      {(error || localErrorMessage) && (
        <div className="rounded border border-rose-500/30 bg-rose-500/10 p-4 text-rose-300 text-sm">
          {error || localErrorMessage}
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Total Documents
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {documents.length}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            All uploaded legal PDFs in this source.
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Processed
          </p>
          <p className="mt-3 text-2xl font-black text-emerald-300">
            {processedCount}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Documents with generated chunks and embeddings.
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Pending
          </p>
          <p className="mt-3 text-2xl font-black text-amber-300">
            {pendingCount}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Documents waiting for processing.
          </p>
        </article>
      </section>

      <section className="rounded border border-cyan-400/15 bg-[#191919] p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Upload Legal Document (PDF)
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_180px_auto_auto]">
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileChange}
            disabled={isUploading}
            className="w-full rounded border border-cyan-400/20 bg-black/30 px-3 py-2 text-sm text-slate-300 file:mr-4 file:rounded file:border-0 file:bg-cyan-500/15 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-cyan-100 hover:file:bg-cyan-500/25 disabled:opacity-50"
          />
          <div className="lg:ml-2">
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
          <button
            type="button"
            onClick={handleUploadDocument}
            disabled={isUploading || !selectedFile}
            className="rounded border border-cyan-400/30 bg-cyan-500/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-100 transition-colors hover:bg-cyan-500/25 disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
          <button
            type="button"
            onClick={processAllPending}
            disabled={pendingCount === 0}
            className="rounded border border-slate-700 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-300 transition-colors hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trigger Processing
          </button>
        </div>
        {selectedFile && (
          <p className="mt-3 text-xs text-slate-400">
            Selected: {selectedFile.name}
          </p>
        )}
      </section>

      <section className="rounded border border-cyan-400/15 bg-[#191919] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            All Documents
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-200/70">
            {documents.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-cyan-200/70">
                <th className="px-3 py-3 font-semibold">Document Name</th>
                <th className="px-3 py-3 font-semibold">Language</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold">Upload Date</th>
                <th className="px-3 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr key={document.id} className="border-b border-white/5">
                  <td className="px-3 py-3 text-slate-200">{document.title}</td>
                  <td className="px-3 py-3 text-slate-300">
                    {document.language}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                        document.status === "Processed"
                          ? "bg-green-500/15 text-green-400"
                          : document.status === "Failed"
                            ? "bg-red-500/15 text-red-400"
                            : "bg-amber-500/15 text-amber-300"
                      }`}
                    >
                      {document.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-400">
                    {new Date(document.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => processDocument(document.id)}
                        disabled={document.status === "Processed"}
                        className="rounded border border-cyan-400/25 bg-cyan-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-100 transition-colors hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Process
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteDocument(document.id)}
                        className="rounded border border-red-400/30 bg-red-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {documents.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-xs text-slate-500"
                  >
                    No documents found. Upload a PDF above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDataSourcesPage;
