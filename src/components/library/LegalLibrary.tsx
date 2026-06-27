import React, { useEffect } from "react";
import { useLibraryStore } from "@/stores/libraryStore";
import { API_CONFIG } from "@/config/api.config";

const LegalLibrary: React.FC = () => {
  const {
    collections,
    letters,
    documents,
    isLoadingCollections,
    isLoadingLetters,
    isLoadingDocuments,
    activeCollectionId,
    activeLetter,
    activeDocument,
    searchQuery,
    collectionMeta,
    fetchCollections,
    fetchLetters,
    fetchDocuments,
    setActiveCollection,
    setActiveLetter,
    setActiveDocument,
    setSearchQuery,
  } = useLibraryStore();

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  // Current view logic
  const currentView = activeDocument ? "documentView" : activeLetter ? "documents" : activeCollectionId ? "letters" : "home";

  const handleCollectionClick = (id: string) => {
    setActiveCollection(id);
    fetchLetters(id);
  };

  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter);
    if (activeCollectionId) {
      fetchDocuments(activeCollectionId, letter);
    }
  };

  const handleBackToHome = () => {
    setActiveCollection(null);
    setActiveLetter(null);
    setSearchQuery("");
  };

  const handleBackToLetters = () => {
    setActiveLetter(null);
    setSearchQuery("");
  };

  const handleBackToDocuments = () => {
    setActiveDocument(null);
  };

  const renderHome = () => (
    <div className="w-full max-w-5xl pb-10">
      <div className="mb-6 flex flex-col items-center">
        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Sri Lankan Legal Corpus</div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 font-serif">Legal Library</h1>
        <span className="text-sm font-mono text-cyan-600 dark:text-cyan-400">
          {collections.reduce((sum, col) => sum + col.count, 0).toLocaleString()}+ documents
        </span>
      </div>

      <div className="mb-10 w-full max-w-2xl mx-auto flex">
        <input
          type="text"
          placeholder="Search entire library by title, citation, or keywords..."
          className="w-full rounded-l-lg border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-black/50 px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchQuery.trim() !== "") {
              // Future: Global search logic
            }
          }}
        />
        <button className="bg-slate-900 dark:bg-slate-200 text-white dark:text-black font-bold text-sm px-6 rounded-r-lg hover:bg-slate-800 dark:hover:bg-white transition-colors">SEARCH</button>
      </div>

      <div className="mb-4">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Collections</div>
        <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Browse by collection</h2>
      </div>

      {isLoadingCollections ? (
        <div className="text-center py-10 text-slate-500">Loading collections...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {collections.map(col => {
            const meta = collectionMeta[col.collection_id] || { code: col.collection_id.toUpperCase(), title: col.collection_id, description: "Unknown collection" };
            return (
              <div
                key={col.collection_id}
                onClick={() => handleCollectionClick(col.collection_id)}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121212] p-5 cursor-pointer hover:border-cyan-500/50 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="text-[10px] font-bold text-white bg-slate-800 dark:bg-slate-700 inline-block px-2 py-0.5 rounded uppercase tracking-wider mb-3">{meta.code}</div>
                  <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white mb-2">{meta.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{meta.description}</p>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-3">
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">{col.count} documents</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500">BROWSE &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="text-center text-xs text-slate-400 font-mono">
        Corpus dynamically updated
      </div>
    </div>
  );

  const renderLetters = () => {
    if (!activeCollectionId) return null;
    const meta = collectionMeta[activeCollectionId] || { title: activeCollectionId };

    return (
      <div className="w-full max-w-5xl pb-10">
        <div className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
          <button onClick={handleBackToHome} className="hover:text-cyan-400">&larr; BACK TO LIBRARY</button>
          <span className="mx-2">/</span>
          <span className="text-cyan-500 uppercase">{meta.title}</span>
        </div>

        <div className="mb-6">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Browse alphabetically</div>
          <div className="flex items-end gap-3">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white font-serif">{meta.title}</h1>
            <span className="text-sm font-mono text-cyan-600 dark:text-cyan-400 mb-1">{letters.length} letters</span>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-400 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
          Select a letter to open the records filed under it.
        </p>

        {isLoadingLetters ? (
          <div className="text-center py-10 text-slate-500">Loading letters...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
            {letters.map(item => (
              <div
                key={item.letter}
                onClick={() => handleLetterClick(item.letter)}
                className="group flex flex-col justify-center items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121212] p-5 cursor-pointer hover:border-cyan-500/50 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">{item.letter}</div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">{item.count} docs</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">OPEN &rarr;</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderDocuments = () => {
    if (!activeCollectionId || !activeLetter) return null;
    const meta = collectionMeta[activeCollectionId] || { title: activeCollectionId, code: activeCollectionId };

    return (
      <div className="w-full max-w-5xl pb-10">
        <div className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
          <button onClick={handleBackToLetters} className="hover:text-cyan-400 uppercase">&larr; BACK TO {meta.title}</button>
          <span className="mx-2">/</span>
          <span className="text-cyan-500">{activeLetter}</span>
        </div>

        <div className="mb-6">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Documents / Records</div>
          <div className="flex items-end gap-3">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white font-serif">{meta.title} - {activeLetter}</h1>
            <span className="text-sm font-mono text-cyan-600 dark:text-cyan-400 mb-1">{documents.length} documents</span>
          </div>
        </div>

        {isLoadingDocuments ? (
          <div className="text-center py-10 text-slate-500">Loading documents...</div>
        ) : documents.length === 0 ? (
          <div className="text-center py-10 text-slate-500">No documents found.</div>
        ) : (
          <div className="border-t border-slate-200 dark:border-slate-800">
            {documents.map(doc => (
              <button
                key={doc.id}
                className="group w-full flex items-center justify-between border-b border-slate-200 dark:border-slate-800 py-4 px-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left"
                onClick={() => setActiveDocument(doc)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1 w-12 shrink-0">{meta.code}</div>
                  <div>
                    <div className="text-base font-semibold text-slate-900 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{doc.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">{doc.document_type || 'PDF'}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">{doc.published_year || 'Unknown Year'}</div>
                  </div>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-4">
                  VIEW &rarr;
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderDocumentView = () => {
    if (!activeDocument) return null;
    const meta = collectionMeta[activeDocument.collection_id || ''] || { title: "Collection", code: activeDocument.collection_id };

    const baseUrl = API_CONFIG.baseURL.replace(/\/api\/?$/, '');

    const pdfUrl = activeDocument.storage_path
      ? `${baseUrl}/${activeDocument.storage_path.replace(/\\/g, '/')}`
      : "";

    return (
      <div className="w-full max-w-5xl pb-10 flex flex-col h-full">
        <div className="mb-4">
          <button onClick={handleBackToDocuments} className="text-cyan-500 hover:text-cyan-400 font-bold text-sm flex items-center gap-2">
            &larr; Back
          </button>
        </div>

        <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121212] text-slate-900 dark:text-white rounded-xl p-6 pb-36 mb-4 shadow-sm relative overflow-hidden">
          <div className="flex gap-2 mb-4">
            <span className="bg-slate-800 dark:bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold">{meta.title}</span>
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-bold">{activeDocument.published_year || "Unknown Year"}</span>
          </div>
          <h1 className="text-3xl font-bold font-serif mb-6 pr-32">{activeDocument.title}</h1>
          <button className="absolute top-6 right-6 bg-white dark:bg-[#121212] hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 transition-colors px-4 py-2 rounded text-sm font-bold flex items-center gap-2 cursor-pointer shadow-sm">
            + Add to Workspace
          </button>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-4 flex items-center justify-between opacity-80">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <div className="bg-slate-200 dark:bg-slate-800 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
            </div>
            <div>
              <span className="font-bold mr-2">AI Document Summary</span>
              <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Coming Soon</span>
              <div className="text-xs mt-0.5">AI-generated summaries will be available shortly</div>
            </div>
          </div>
        </div>


        <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col flex-1 min-h-[600px]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <svg className="text-red-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
              <h2 className="font-bold text-slate-900 dark:text-white text-lg">Official Act ({activeDocument.document_type?.toUpperCase() || 'PDF'})</h2>
            </div>
            <div className="flex gap-2">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="border border-slate-300 dark:border-slate-700 rounded px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Open
              </a>
              <a href={pdfUrl} download className="border border-slate-300 dark:border-slate-700 rounded px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Download
              </a>
            </div>
          </div>

          <div className="flex-1 bg-slate-100 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 overflow-hidden relative min-h-[500px]">
            {pdfUrl ? (
              <iframe
                src={`${pdfUrl}#toolbar=1`}
                className="w-full h-full border-0 absolute inset-0"
                title={activeDocument.title || undefined}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500">
                Document URL is not available.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative z-10 flex w-full flex-1 flex-col items-center px-4 pt-10 md:px-6 h-full overflow-y-auto">
      {currentView === "home" && renderHome()}
      {currentView === "letters" && renderLetters()}
      {currentView === "documents" && renderDocuments()}
      {currentView === "documentView" && renderDocumentView()}
    </div>
  );
};

export default LegalLibrary;
