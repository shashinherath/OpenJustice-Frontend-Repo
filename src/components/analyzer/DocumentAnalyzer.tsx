import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeDocument } from "@/services/analyzerService";
import { useTranslation } from "react-i18next";

const DOCUMENT_TYPES = [
  "General Document",
  "Contract",
  "Legal Opinion",
  "Court Order",
  "Other"
];

const ANALYSIS_TYPES = [
  "Risk & Compliance",
  "Summarization",
  "Entity Extraction",
  "Clause Analysis",
  "Custom Prompt"
];

const DocumentAnalyzer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedType, setSelectedType] = useState<string>("Contract");
  const [customDocumentType, setCustomDocumentType] = useState<string>("");
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>("Risk & Compliance");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAnalysisDropdownOpen, setIsAnalysisDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const analysisDropdownRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (analysisDropdownRef.current && !analysisDropdownRef.current.contains(event.target as Node)) {
        setIsAnalysisDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    setError(null);
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.pdf') && !selectedFile.name.endsWith('.docx')) {
      setError(t("analyzerUploadError"));
      return;
    }
    
    setFile(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const actualDocType = selectedType === "Other" && customDocumentType.trim() !== "" ? customDocumentType : selectedType;
      const result = await analyzeDocument(
        file, 
        actualDocType, 
        selectedAnalysisType, 
        selectedAnalysisType === "Custom Prompt" ? customPrompt : undefined
      );
      if (result && result.conversation_id) {
        // Navigate to the newly created chat conversation
        navigate(`/chat/${result.conversation_id}`);
      }
    } catch (err: any) {
      console.error("Analysis failed:", err);
      const errorMsg = err.response?.data?.error?.message || err.response?.data?.detail || t("analyzerFailError");
      setError(errorMsg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative z-10 flex w-full flex-1 flex-col items-center px-4 pt-10 md:px-6 h-full overflow-y-auto">
      <div className="w-full max-w-4xl flex flex-col items-center pb-20">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">{t("analyzerHeaderLabel")}</div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-serif">{t("analyzerTitle")}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
          {t("analyzerSubtitle")}
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto rounded-3xl border border-white/40 bg-white/55 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#191919]/55">
        
        {/* Type Selectors */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Document Type Selector */}
          <div className="relative z-30">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
              {t("analyzerStep1")}
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  setIsAnalysisDropdownOpen(false);
                }}
                className="w-full flex justify-between items-center rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-xl transition-all hover:bg-white/70 focus:border-slate-500 focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white dark:hover:bg-white/5 dark:focus:border-slate-400 cursor-pointer"
              >
                <span>{selectedType === "General Document" ? t("analyzerTypeGeneral") : selectedType === "Contract" ? t("analyzerTypeContract") : selectedType === "Legal Opinion" ? t("analyzerTypeOpinion") : selectedType === "Court Order" ? t("analyzerTypeOrder") : t("analyzerTypeOther")}</span>
                <span className={`material-symbols-outlined text-[20px] text-slate-500 dark:text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 rounded-xl border border-white/40 bg-white/80 backdrop-blur-2xl shadow-xl dark:border-white/10 dark:bg-[#202020]/90 overflow-hidden py-1 transform opacity-100 scale-100 transition-all origin-top">
                  {DOCUMENT_TYPES.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedType(type);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer hover:bg-slate-200/50 dark:hover:bg-white/10 ${
                        selectedType === type 
                          ? "bg-slate-200/40 font-bold text-slate-900 dark:bg-white/10 dark:text-white" 
                          : "font-semibold text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {type === "General Document" ? t("analyzerTypeGeneral") : type === "Contract" ? t("analyzerTypeContract") : type === "Legal Opinion" ? t("analyzerTypeOpinion") : type === "Court Order" ? t("analyzerTypeOrder") : t("analyzerTypeOther")}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Analysis Type Selector */}
          <div className="relative z-20" ref={analysisDropdownRef}>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
              {t("analyzerStep2")}
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsAnalysisDropdownOpen(!isAnalysisDropdownOpen);
                  setIsDropdownOpen(false);
                }}
                className="w-full flex justify-between items-center rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-xl transition-all hover:bg-white/70 focus:border-slate-500 focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white dark:hover:bg-white/5 dark:focus:border-slate-400 cursor-pointer"
              >
                <span>{selectedAnalysisType === "Risk & Compliance" ? t("analyzerAnalysisRisk") : selectedAnalysisType === "Summarization" ? t("analyzerAnalysisSummary") : selectedAnalysisType === "Entity Extraction" ? t("analyzerAnalysisEntity") : selectedAnalysisType === "Clause Analysis" ? t("analyzerAnalysisClause") : t("analyzerAnalysisCustom")}</span>
                <span className={`material-symbols-outlined text-[20px] text-slate-500 dark:text-slate-400 transition-transform ${isAnalysisDropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              
              {isAnalysisDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 rounded-xl border border-white/40 bg-white/80 backdrop-blur-2xl shadow-xl dark:border-white/10 dark:bg-[#202020]/90 overflow-hidden py-1 transform opacity-100 scale-100 transition-all origin-top">
                  {ANALYSIS_TYPES.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedAnalysisType(type);
                        setIsAnalysisDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer hover:bg-slate-200/50 dark:hover:bg-white/10 ${
                        selectedAnalysisType === type 
                          ? "bg-slate-200/40 font-bold text-slate-900 dark:bg-white/10 dark:text-white" 
                          : "font-semibold text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {type === "Risk & Compliance" ? t("analyzerAnalysisRisk") : type === "Summarization" ? t("analyzerAnalysisSummary") : type === "Entity Extraction" ? t("analyzerAnalysisEntity") : type === "Clause Analysis" ? t("analyzerAnalysisClause") : t("analyzerAnalysisCustom")}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        {/* Custom Document Type Input */}
        {selectedType === "Other" && (
          <div className="mb-6 animate-in fade-in duration-300">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
              {t("analyzerSpecifyType")}
            </label>
            <input
              type="text"
              value={customDocumentType}
              onChange={(e) => setCustomDocumentType(e.target.value)}
              placeholder={t("analyzerSpecifyTypePlaceholder")}
              className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-xl transition-all focus:border-slate-500 focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-slate-400"
            />
          </div>
        )}

        </div>

        {/* Custom Prompt Textarea */}
        {selectedAnalysisType === "Custom Prompt" && (
          <div className="mb-6 animate-in fade-in duration-300">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
              {t("analyzerCustomInstructions")}
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={t("analyzerCustomPromptPlaceholder")}
              className="w-full min-h-[100px] rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-xl transition-all focus:border-slate-500 focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-slate-400 resize-y"
            />
          </div>
        )}

        {/* File Upload Zone */}
        <div className="mb-8">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
            {t("analyzerStep3")}
          </label>
          <div 
            className={`relative flex flex-col items-center justify-center w-full h-40 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
              isDragging 
                ? 'border-slate-800 bg-slate-100/50 dark:border-slate-300 dark:bg-slate-800/50' 
                : file
                  ? 'border-slate-400 bg-slate-50/50 dark:border-slate-500 dark:bg-slate-900/50'
                  : 'border-slate-300 border-white/40 bg-white/30 hover:bg-white/50 dark:border-white/10 dark:bg-black/10 dark:hover:bg-black/20'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            
            {file ? (
              <div className="flex flex-col items-center text-center p-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                  <span className="material-symbols-outlined text-[20px]">check</span>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{file.name}</p>
                <p className="text-xs text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <p className="text-xs text-slate-500 mt-3 font-semibold hover:text-slate-800 dark:hover:text-slate-300" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                  {t("analyzerRemoveFile")}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center p-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">upload_file</span>
                </div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {t("analyzerUploadPrompt")}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {t("analyzerUploadFormat")}
                </p>
              </div>
            )}
          </div>
          {error && <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span> {error}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-2">
          <button
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
            className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg w-full sm:w-auto ${
              !file
                ? "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none dark:bg-slate-800 dark:text-slate-600"
                : isAnalyzing
                ? "bg-slate-700 text-white cursor-wait"
                : "bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-xl dark:bg-slate-200 dark:text-black dark:hover:bg-white"
            }`}
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t("analyzerAnalyzingBtn")}
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                {t("analyzerRunBtn")}
              </>
            )}
          </button>
        </div>
        
        {isAnalyzing && (
          <p className="text-xs text-center text-slate-500 mt-4 animate-pulse">
            {t("analyzerLoadingMsg")}
          </p>
        )}
      </div>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;
