import React, { useContext, useEffect, useMemo, useState } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import LanguageSelect from "@/components/ui/LanguageSelect";
import { useTheme } from "@/hooks/common/useTheme";
import { useChatStore } from "@/stores/chatStore";
import { LANGUAGE_OPTIONS, type AppLanguage } from "@/constants/languages";

type SettingsSection = "general" | "data-controls" | "security" | "account";

type AccentColor = "default" | "blue" | "emerald" | "amber" | "rose";
type VoiceOption = "alloy" | "nova" | "echo";

const ACCENT_STORAGE_KEY = "oj-accent-color";
const accentColorHexMap: Record<AccentColor, string> = {
  default: "#64748b",
  blue: "#3b82f6",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
};

const getAccentFromStorage = (): AccentColor => {
  if (typeof window === "undefined") {
    return "blue";
  }

  const stored = localStorage.getItem(ACCENT_STORAGE_KEY) as AccentColor | null;
  if (stored && Object.keys(accentColorHexMap).includes(stored)) {
    return stored;
  }
  return "default";
};

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const languageContext = useContext(LanguageContext);
  const currentLang = (languageContext?.currentLanguage as AppLanguage) || "en";
  const tr = (en: string, si: string, ta: string) => (currentLang === "si" ? si : currentLang === "ta" ? ta : en);

  const sectionItems: Array<{ id: SettingsSection; label: string; icon: string }> = [
    { id: "general", label: tr("General", "සාමාන්‍ය", "பொது"), icon: "tune" },
    { id: "data-controls", label: tr("Data Controls", "දත්ත පාලන", "தரவு கட்டுப்பாடுகள்"), icon: "database" },
    { id: "security", label: tr("Security", "ආරක්ෂාව", "பாதுகாப்பு"), icon: "shield_lock" },
    { id: "account", label: tr("Account", "ගිණුම", "கணக்கு"), icon: "manage_accounts" },
  ];
  const { sidebarChats, chatMessagesById, activeConversationId, archiveAllChats, unarchiveChat, deleteChat, deleteAllChats } = useChatStore();

  const [activeSection, setActiveSection] = useState<SettingsSection>("general");

  const [appearance, setAppearance] = useState<"system" | "light" | "dark">(theme);
  const [accentColor, setAccentColor] = useState<AccentColor>(getAccentFromStorage);
  const [language, setLanguage] = useState<AppLanguage>((languageContext?.currentLanguage as AppLanguage) || "en");
  const [spokenLanguage, setSpokenLanguage] = useState<AppLanguage>((languageContext?.currentLanguage as AppLanguage) || "en");
  const [voice, setVoice] = useState<VoiceOption>("alloy");

  const [improveModel, setImproveModel] = useState(false);

  const [authenticatorEnabled, setAuthenticatorEnabled] = useState(false);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);
  const [showQrPanel, setShowQrPanel] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const archivedChats = useMemo(
    () => sidebarChats.filter((chat) => chat.isArchived),
    [sidebarChats],
  );

  const qrCodeSrc = useMemo(
    () =>
      "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=otpauth%3A%2F%2Ftotp%2FOpenJustice%3Ajsmith%40university.edu%3Fsecret%3DJBSWY3DPEHPK3PXP%26issuer%3DOpenJustice",
    [],
  );

  const detectLanguage = (): AppLanguage => {
    const browserLang = (navigator.language || "en").toLowerCase();
    if (browserLang.startsWith("si")) {
      return "si";
    }
    if (browserLang.startsWith("ta")) {
      return "ta";
    }
    return "en";
  };

  const playVoiceSample = () => {
    const textByLanguage: Record<AppLanguage, string> = {
      en: "Welcome to OpenJustice. This is a sample voice playback.",
      si: "OpenJustice වෙත සාදරයෙන් පිළිගනිමු. මෙය හඬ නියැදි ප්‍රදර්ශනයකි.",
      ta: "OpenJustice க்கு வரவேற்கிறோம். இது ஒரு குரல் மாதிரி ஒலிபரப்பு.",
    };

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textByLanguage[spokenLanguage]);
    utterance.lang = spokenLanguage;
    utterance.rate = voice === "alloy" ? 1 : voice === "nova" ? 0.92 : 1.07;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (appearance === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      return;
    }
    setTheme(appearance);
  }, [appearance, setTheme]);

  useEffect(() => {
    if (!languageContext) {
      return;
    }
    void languageContext.changeLanguage(language);
  }, [language, languageContext]);

  useEffect(() => {
    const root = document.documentElement;
    const hex = accentColorHexMap[accentColor];
    root.style.setProperty("--oj-accent-color", hex);
    localStorage.setItem(ACCENT_STORAGE_KEY, accentColor);
  }, [accentColor]);

  const autoDetectInterfaceLanguage = () => {
    const detected = detectLanguage();
    setLanguage(detected);
  };

  const autoDetectSpokenLanguage = () => {
    const detected = detectLanguage();
    setSpokenLanguage(detected);
  };

  const handleExportData = () => {
    if (typeof window === "undefined") {
      return;
    }

    const payload = {
      exportedAt: new Date().toISOString(),
      activeConversationId,
      chats: sidebarChats.map((chat) => ({
        ...chat,
        messages: (chatMessagesById[chat.id] || []).map((message) => ({
          ...message,
          timestamp: new Date(message.timestamp).toISOString(),
        })),
      })),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const fileDate = new Date().toISOString().slice(0, 10);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `openjustice-data-${fileDate}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAllChats = () => {
    if (sidebarChats.length === 0 || typeof window === "undefined") {
      return;
    }

    const confirmed = window.confirm(
      tr(
        "Are you sure you want to permanently delete all chats? This action cannot be undone.",
        "ඔබට සියලු චැට් ස්ථිරවම මකා දැමීමට අවශ්‍යද? මෙම ක්‍රියාව ආපසු හැරවිය නොහැක.",
        "எல்லா அரட்டைகளையும் நிரந்தரமாக நீக்க விரும்புகிறீர்களா? இந்த செயலினை மாற்ற முடியாது.",
      ),
    );

    if (!confirmed) {
      return;
    }

    deleteAllChats();
  };

  return (
    <div className="grid h-full grid-cols-1 gap-5 lg:grid-cols-12">
      <aside className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 lg:col-span-3">
        <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">{tr("Settings", "සැකසුම්", "அமைப்புகள்")}</p>
        <div className="space-y-1.5">
          {sectionItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  active
                    ? "bg-zinc-100 text-zinc-950"
                    : "text-zinc-300 hover:bg-zinc-800/80 hover:text-zinc-100"
                }`}
                type="button"
                onClick={() => setActiveSection(item.id)}
              >
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="space-y-4 lg:col-span-9">
        {activeSection === "general" && (
          <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="text-lg font-semibold text-zinc-100">{tr("General", "සාමාන්‍ය", "பொது")}</h3>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{tr("Appearance", "පෙනුම", "தோற்றம்")}</p>
              <select
                className="max-w-56 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-semibold capitalize text-zinc-100"
                value={appearance}
                onChange={(event) => setAppearance(event.target.value as "system" | "light" | "dark")}
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{tr("Accent Color", "ඇක්සන්ට් වර්ණය", "உச்ச நிறம்")}</p>
              <select
                className="max-w-64 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-semibold text-zinc-100"
                value={accentColor}
                onChange={(event) => setAccentColor(event.target.value as AccentColor)}
              >
                <option value="default">⚫ Default</option>
                <option value="blue">🔵 Blue</option>
                <option value="emerald">🟢 Emerald</option>
                <option value="amber">🟠 Amber</option>
                <option value="rose">🔴 Rose</option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">{tr("Language", "භාෂාව", "மொழி")}</label>
                <div className="flex items-center gap-2">
                  <LanguageSelect
                    value={language}
                    onChange={(v) => setLanguage(v as AppLanguage)}
                    options={LANGUAGE_OPTIONS.map(item => ({ value: item.value, label: item.label }))}
                    ariaLabel={tr("Select interface language", "අතුරුමුහුණත් භාෂාව තෝරන්න", "இணைமுக மொழியை தேர்ந்தெடுக்கவும்")}
                    className="w-full"
                  />
                  <button
                    className="rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
                    type="button"
                    onClick={autoDetectInterfaceLanguage}
                  >
                    {tr("Auto-detect", "ස්වයං හඳුනාගන්න", "தானாக கண்டறி")}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">{tr("Spoken Language", "කථන භාෂාව", "பேச்சு மொழி")}</label>
                <div className="flex items-center gap-2">
                  <LanguageSelect
                    value={spokenLanguage}
                    onChange={(v) => setSpokenLanguage(v as AppLanguage)}
                    options={LANGUAGE_OPTIONS.map(item => ({ value: item.value, label: item.label }))}
                    ariaLabel={tr("Select spoken language", "කථන භාෂාව තෝරන්න", "பேச்சு மொழியை தேர்ந்தெடுக்கவும்")}
                    className="w-full"
                  />
                  <button
                    className="rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
                    type="button"
                    onClick={autoDetectSpokenLanguage}
                  >
                    {tr("Auto-detect", "ස්වයං හඳුනාගන්න", "தானாக கண்டறி")}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">{tr("Voice", "හඬ", "குரல்")}</label>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  className="min-w-45 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  value={voice}
                  onChange={(event) => setVoice(event.target.value as VoiceOption)}
                >
                  <option value="alloy">Alloy</option>
                  <option value="nova">Nova</option>
                  <option value="echo">Echo</option>
                </select>
                <button
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:bg-zinc-800"
                  type="button"
                  onClick={playVoiceSample}
                >
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  {tr("Play sample voice", "නියැදි හඬ ධාවනය කරන්න", "மாதிரி குரலை இயக்கவும்")}
                </button>
              </div>
            </div>
          </section>
        )}

        {activeSection === "data-controls" && (
          <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="text-lg font-semibold text-zinc-100">{tr("Data Controls", "දත්ත පාලන", "தரவு கட்டுப்பாடுகள்")}</h3>

            <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-zinc-100">{tr("Improve the model for everyone", "සියලු දෙනා සඳහා මොඩලය වැඩිදියුණු කරන්න", "அனைவருக்கும் மாதிரியை மேம்படுத்தவும்")}</p>
                <p className="text-xs text-zinc-500">{tr("Allow anonymized conversations to improve quality.", "නිර්නාමික සංවාද ගුණාත්මකභාවය වැඩිදියුණු කිරීමට ඉඩ දෙන්න.", "அடையாளமற்ற உரையாடல்களை தர மேம்பாட்டிற்கு அனுமதிக்கவும்.")}</p>
              </div>
              <button
                className={`flex h-6 w-12 items-center rounded-full px-1 transition-colors ${improveModel ? "justify-end bg-zinc-100" : "justify-start bg-zinc-700"}`}
                type="button"
                onClick={() => setImproveModel((value) => !value)}
                aria-label="Toggle improve model"
              >
                <span className={`h-4 w-4 rounded-full ${improveModel ? "bg-zinc-950" : "bg-zinc-300"}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                className="rounded-lg border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-800"
                type="button"
                onClick={archiveAllChats}
              >
                {tr("Archive all chats", "සියලු චැට් සංරක්ෂිත කරන්න", "அனைத்து அரட்டைகளையும் காப்பகப்படுத்து")}
              </button>
              <button
                className="rounded-lg border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-800"
                type="button"
                onClick={handleExportData}
              >
                {tr("Export data", "දත්ත අපනයනය", "தரவை ஏற்றுமதி செய்")}
              </button>
              <button className="rounded-lg border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-800" type="button">
                {tr("Shared links", "බෙදාගත් සබැඳි", "பகிரப்பட்ட இணைப்புகள்")}
              </button>
              <button
                className="rounded-lg border border-red-700/50 px-3 py-2 text-sm font-semibold text-red-300 hover:bg-red-900/20 disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={handleDeleteAllChats}
                disabled={sidebarChats.length === 0}
              >
                {tr("Delete all chats", "සියලු චැට් මකා දමන්න", "அனைத்து அரட்டைகளையும் நீக்கு")}
              </button>
            </div>

            <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{tr("Manage archived chats", "සංරක්ෂිත චැට් කළමනාකරණය", "காப்பக அரட்டைகள் நிர்வகிக்க")}</p>

              {archivedChats.length === 0 ? (
                <p className="text-sm text-zinc-400">{tr("No archived chats available.", "සංරක්ෂිත චැට් නොමැත.", "காப்பக அரட்டைகள் இல்லை.")}</p>
              ) : (
                <div className="space-y-2">
                  {archivedChats.map((chat) => (
                    <div
                      key={chat.id}
                      className="flex items-center justify-between gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-200">{chat.title}</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          className="rounded-md p-1.5 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                          type="button"
                          aria-label={`Unarchive ${chat.title}`}
                          onClick={() => unarchiveChat(chat.id)}
                        >
                          <span className="material-symbols-outlined text-[18px]">unarchive</span>
                        </button>
                        <button
                          className="rounded-md p-1.5 text-red-300 transition-colors hover:bg-red-900/30 hover:text-red-200"
                          type="button"
                          aria-label={`Delete ${chat.title}`}
                          onClick={() => deleteChat(chat.id)}
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === "security" && (
          <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="text-lg font-semibold text-zinc-100">Security</h3>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
              <h4 className="mb-3 text-sm font-semibold text-zinc-200">Password</h4>
              <div className="grid gap-3 md:grid-cols-3">
                <input
                  className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                />
                <input
                  className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
                <input
                  className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
              <h4 className="mb-3 text-sm font-semibold text-zinc-200">MFA</h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-md border border-zinc-800 px-3 py-2">
                  <div>
                    <p className="text-sm font-medium text-zinc-100">Authenticator app</p>
                    <p className="text-xs text-zinc-500">Use TOTP app for secure sign-in.</p>
                  </div>
                  <button
                    className={`flex h-6 w-12 items-center rounded-full px-1 transition-colors ${authenticatorEnabled ? "justify-end bg-zinc-100" : "justify-start bg-zinc-700"}`}
                    type="button"
                    onClick={() => {
                      setAuthenticatorEnabled((value) => {
                        const next = !value;
                        setShowQrPanel(next);
                        return next;
                      });
                    }}
                    aria-label="Toggle authenticator app"
                  >
                    <span className={`h-4 w-4 rounded-full ${authenticatorEnabled ? "bg-zinc-950" : "bg-zinc-300"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-md border border-zinc-800 px-3 py-2">
                  <div>
                    <p className="text-sm font-medium text-zinc-100">Push notifications</p>
                    <p className="text-xs text-zinc-500">Approve sign-in from your trusted device.</p>
                  </div>
                  <button
                    className={`flex h-6 w-12 items-center rounded-full px-1 transition-colors ${pushNotificationsEnabled ? "justify-end bg-zinc-100" : "justify-start bg-zinc-700"}`}
                    type="button"
                    onClick={() => setPushNotificationsEnabled((value) => !value)}
                    aria-label="Toggle push notifications"
                  >
                    <span className={`h-4 w-4 rounded-full ${pushNotificationsEnabled ? "bg-zinc-950" : "bg-zinc-300"}`} />
                  </button>
                </div>
              </div>

              {showQrPanel && (
                <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
                  <p className="mb-2 text-sm font-semibold text-zinc-100">Scan QR code in your authenticator app</p>
                  <ol className="mb-3 list-decimal space-y-1 pl-4 text-xs text-zinc-400">
                    <li>Open Google Authenticator, Microsoft Authenticator, or Authy.</li>
                    <li>Choose Add account and tap Scan QR code.</li>
                    <li>Scan the code below and enter the 6-digit code on next sign-in.</li>
                  </ol>
                  <img alt="Authenticator QR code" className="h-40 w-40 rounded-md border border-zinc-700 bg-white p-2" src={qrCodeSrc} />
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === "account" && (
          <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="text-lg font-semibold text-zinc-100">Account</h3>
            <div className="space-y-2 text-sm text-zinc-300">
              <p>Email: jsmith@university.edu</p>
              <p>Plan: Research Prototype</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-lg border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-800" type="button">
                Manage linked devices
              </button>
              <button className="rounded-lg border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-800" type="button">
                Download account report
              </button>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default SettingsPage;
