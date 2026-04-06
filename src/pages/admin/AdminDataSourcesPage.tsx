import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/layout/AdminLayout";

type DocumentStatus = "Processed" | "Pending";

interface LegalDocument {
  id: string;
  name: string;
  language: string;
  status: DocumentStatus;
  uploadDate: string;
}

const getToday = (): string => new Date().toLocaleDateString();

const INITIAL_DOCUMENTS: LegalDocument[] = [
  { id: "doc-1", name: "Constitution_2024.pdf", language: "English", status: "Processed", uploadDate: "3/24/2026" },
  { id: "doc-2", name: "Evidence_Ordinance_si.pdf", language: "Sinhala", status: "Pending", uploadDate: "4/1/2026" },
  { id: "doc-3", name: "Civil_Procedure_ta.pdf", language: "Tamil", status: "Pending", uploadDate: "4/4/2026" },
];

const AdminDataSourcesPage: React.FC = () => {
  const [documents, setDocuments] = useState<LegalDocument[]>(INITIAL_DOCUMENTS);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const processedCount = useMemo(
    () => documents.filter(document => document.status === "Processed").length,
    [documents]
  );
  const pendingCount = documents.length - processedCount;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setErrorMessage("");

    if (!nextFile) {
      setSelectedFile(null);
      return;
    }

    const isPdfByType = nextFile.type === "application/pdf";
    const isPdfByName = nextFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdfByType && !isPdfByName) {
      setErrorMessage("Only PDF files are allowed.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(nextFile);
  };

  const handleUploadDocument = () => {
    if (!selectedFile) {
      setErrorMessage("Please select a PDF document before uploading.");
      return;
    }

    const newDocument: LegalDocument = {
      id: `doc-${Date.now()}`,
      name: selectedFile.name,
      language: selectedLanguage,
      status: "Pending",
      uploadDate: getToday(),
    };

    setDocuments(previous => [newDocument, ...previous]);
    setSelectedFile(null);
    setErrorMessage("");
  };

  const handleProcessDocument = (documentId: string) => {
    setDocuments(previous =>
      previous.map(document =>
        document.id === documentId ? { ...document, status: "Processed" } : document
      )
    );
  };

  const handleProcessAll = () => {
    setDocuments(previous =>
      previous.map(document => ({ ...document, status: "Processed" }))
    );
  };

  const handleDeleteDocument = (documentId: string) => {
    setDocuments(previous => previous.filter(document => document.id !== documentId));
  };

  return (
    <AdminLayout>
      <div className="space-y-8 p-8">
        <section className="rounded border border-white/10 bg-white/3 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Data Sources</h2>
              <p className="mt-3 max-w-3xl text-sm text-slate-400">
                Upload legal PDF documents, view all documents, trigger chunking and embedding processing, and remove documents.
              </p>
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Overview
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Total Documents</p>
            <p className="mt-3 text-2xl font-black text-white">{documents.length}</p>
            <p className="mt-2 text-xs text-slate-400">All uploaded legal PDFs in this source.</p>
          </article>
          <article className="rounded border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Processed</p>
            <p className="mt-3 text-2xl font-black text-white">{processedCount}</p>
            <p className="mt-2 text-xs text-slate-400">Documents with generated chunks and embeddings.</p>
          </article>
          <article className="rounded border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Pending</p>
            <p className="mt-3 text-2xl font-black text-white">{pendingCount}</p>
            <p className="mt-2 text-xs text-slate-400">Documents waiting for processing.</p>
          </article>
        </section>

        <section className="rounded border border-white/10 bg-white/2 p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Upload Legal Document (PDF)</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_180px_auto_auto]">
            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              className="w-full rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-300 file:mr-4 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-white/20"
            />
            <select
              value={selectedLanguage}
              onChange={event => setSelectedLanguage(event.target.value)}
              className="rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-300"
            >
              <option>English</option>
              <option>Sinhala</option>
              <option>Tamil</option>
            </select>
            <button
              type="button"
              onClick={handleUploadDocument}
              className="rounded border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/20"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={handleProcessAll}
              className="rounded border border-white/10 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              Trigger Processing
            </button>
          </div>
          {selectedFile && (
            <p className="mt-3 text-xs text-slate-400">Selected: {selectedFile.name}</p>
          )}
          {errorMessage && <p className="mt-3 text-xs font-semibold text-red-400">{errorMessage}</p>}
        </section>

        <section className="rounded border border-white/10 bg-white/2 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">All Documents</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{documents.length} entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="px-3 py-3 font-semibold">Document Name</th>
                  <th className="px-3 py-3 font-semibold">Language</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 font-semibold">Upload Date</th>
                  <th className="px-3 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(document => (
                  <tr key={document.id} className="border-b border-white/5">
                    <td className="px-3 py-3 text-slate-200">{document.name}</td>
                    <td className="px-3 py-3 text-slate-300">{document.language}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                          document.status === "Processed"
                            ? "bg-green-500/15 text-green-400"
                            : "bg-amber-500/15 text-amber-300"
                        }`}
                      >
                        {document.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-400">{document.uploadDate}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleProcessDocument(document.id)}
                          disabled={document.status === "Processed"}
                          className="rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Process
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteDocument(document.id)}
                          className="rounded border border-red-400/30 bg-red-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminDataSourcesPage;
