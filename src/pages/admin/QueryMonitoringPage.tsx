import React, { useMemo, useState } from "react";
import AdminLayout from "@/layout/AdminLayout";
import LanguageSelect from "@/components/ui/LanguageSelect";

interface QueryMonitorRecord {
  id: string;
  queryText: string;
  responsePreview: string;
  language: "English" | "Sinhala" | "Tamil";
  timestamp: string;
}

const QUERY_MONITOR_RECORDS: QueryMonitorRecord[] = [
  {
    id: "QM-9001",
    queryText: "What is the legal process for filing a labor complaint?",
    responsePreview: "The process starts by submitting a complaint letter to the Labour Department...",
    language: "English",
    timestamp: "2026-04-06 10:18",
  },
  {
    id: "QM-9002",
    queryText: "නීතිමය සහාය ලබාගැනීමේ පියවර මොනවාද?",
    responsePreview: "ඔබට මුලින්ම ප්‍රාදේශීය නීති ආධාර මධ්‍යස්ථානය සම්බන්ධ කරගත යුතුය...",
    language: "Sinhala",
    timestamp: "2026-04-06 10:05",
  },
  {
    id: "QM-9003",
    queryText: "வாடகை ஒப்பந்தம் முடிவுறும் போது உரிமைகள் என்ன?",
    responsePreview: "ஒப்பந்தம் முடிவுறும் முன் எழுத்து அறிவிப்பு வழங்கப்பட வேண்டும்...",
    language: "Tamil",
    timestamp: "2026-04-06 09:57",
  },
  {
    id: "QM-9004",
    queryText: "Can I appeal a rejected administrative request?",
    responsePreview: "Yes, an appeal may be filed within the prescribed statutory timeline...",
    language: "English",
    timestamp: "2026-04-06 09:43",
  },
];

const QueryMonitoringPage: React.FC = () => {
  const [queryRows] = useState<QueryMonitorRecord[]>(QUERY_MONITOR_RECORDS);
  const [languageFilter, setLanguageFilter] = useState<"All" | QueryMonitorRecord["language"]>("All");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const filteredQueries = useMemo(() => {
    if (languageFilter === "All") {
      return queryRows;
    }

    return queryRows.filter(row => row.language === languageFilter);
  }, [languageFilter, queryRows]);

  return (
    <AdminLayout>
      <div className="space-y-8 p-8">
        <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
          <div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Query Monitoring</h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300">
              View user questions and AI answers with language filtering and conversation-level inspection.
            </p>
          </div>
        </section>

        <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">User Queries and AI Answers</h3>
            <LanguageSelect
              value={languageFilter}
              onChange={(v) => setLanguageFilter(v as "All" | QueryMonitorRecord["language"])}
              options={[
                { value: "All", label: "All Languages" },
                { value: "English", label: "English" },
                { value: "Sinhala", label: "Sinhala" },
                { value: "Tamil", label: "Tamil" },
              ]}
              ariaLabel="Filter language"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="px-3 py-3 font-semibold">Query text</th>
                  <th className="px-3 py-3 font-semibold">Response preview</th>
                  <th className="px-3 py-3 font-semibold">Language detected</th>
                  <th className="px-3 py-3 font-semibold">Timestamp</th>
                  <th className="px-3 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQueries.map(row => (
                  <tr key={row.id} className="border-b border-white/5">
                    <td className="px-3 py-3 text-slate-200">{row.queryText}</td>
                    <td className="px-3 py-3 text-slate-300">{row.responsePreview}</td>
                    <td className="px-3 py-3 text-slate-300">{row.language}</td>
                    <td className="px-3 py-3 text-slate-400">{row.timestamp}</td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => setSelectedConversationId(row.id)}
                        className="rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        View full conversation
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedConversationId && (
            <div className="mt-4 rounded border border-white/10 bg-[#191919] p-4 text-sm text-slate-300">
              Full conversation viewer opened for <span className="font-semibold text-white">{selectedConversationId}</span>.
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
};

export default QueryMonitoringPage;

