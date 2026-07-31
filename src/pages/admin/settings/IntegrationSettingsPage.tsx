import React, { useState, useEffect } from "react";
import { adminService } from "../../../services/adminService";
import type { IntegrationSettingsPayload } from "../../../services/adminService";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";

interface IntegrationSettings {
  openaiApiKey: string;
  openaiApiKeyHidden: boolean;
  twilioAccountSid: string;
  twilioAuthToken: string;
  whatsappPhoneNumber: string;
  webSocketUrl: string;
}

const IntegrationSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<IntegrationSettings>({
    openaiApiKey: "",
    openaiApiKeyHidden: true,
    twilioAccountSid: "",
    twilioAuthToken: "",
    whatsappPhoneNumber: "",
    webSocketUrl: "",
  });

  const [saveNotice, setSaveNotice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await adminService.getIntegrationSettings();
        setSettings({
          openaiApiKey: data.openai_api_key || "",
          openaiApiKeyHidden: true,
          twilioAccountSid: data.twilio_account_sid || "",
          twilioAuthToken: data.twilio_auth_token || "",
          whatsappPhoneNumber: data.whatsapp_phone_number || "",
          webSocketUrl: data.web_socket_url || "",
        });
      } catch (error) {
        console.error("Failed to fetch integration settings", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const payload: IntegrationSettingsPayload = {
        openai_api_key: settings.openaiApiKey,
        twilio_account_sid: settings.twilioAccountSid,
        twilio_auth_token: settings.twilioAuthToken,
        whatsapp_phone_number: settings.whatsappPhoneNumber,
        web_socket_url: settings.webSocketUrl,
      };
      await adminService.updateIntegrationSettings(payload);
      setSaveNotice("Integration settings saved successfully.");
      setTimeout(() => setSaveNotice(""), 3000);
    } catch (error) {
      console.error("Failed to save integration settings", error);
      setSaveNotice("Failed to save integration settings.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-white dark:bg-[#191919] p-6">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Integration Settings
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Configure API credentials for OpenAI, Twilio, WhatsApp, and
            WebSocket connectivity.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            OpenAI API
          </p>
          <p className="mt-3 text-2xl font-black text-green-400">Connected</p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Twilio Integration
          </p>
          <p className="mt-3 text-2xl font-black text-green-400">Active</p>
        </article>
        <article className="rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            WebSocket Status
          </p>
          <p className="mt-3 text-2xl font-black text-green-400">Ready</p>
        </article>
      </section>

      <section className="space-y-6 rounded border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-[#191919] p-6">
        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            OpenAI API Configuration
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Manage OpenAI API key for LLM generation.
          </p>
          <div className="mt-4 space-y-3">
            <div className="md:w-96">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
                API Key
              </label>
              <div className="flex gap-2">
                <input
                  type={settings.openaiApiKeyHidden ? "password" : "text"}
                  value={settings.openaiApiKey}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      openaiApiKey: e.target.value,
                    })
                  }
                  placeholder="sk-..."
                  className="flex-1 rounded border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition-colors hover:border-cyan-400/30 focus:border-cyan-400/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    setSettings({
                      ...settings,
                      openaiApiKeyHidden: !settings.openaiApiKeyHidden,
                    })
                  }
                  className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
                >
                  {settings.openaiApiKeyHidden ? "Show" : "Hide"}
                </button>
              </div>
            </div>
            <button
              type="button"
              className="rounded border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-300 transition-colors hover:bg-cyan-500/20"
            >
              Rotate Key
            </button>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Twilio Configuration
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            SMS and WhatsApp messaging via Twilio.
          </p>
          <div className="mt-4 space-y-4 md:w-96">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
                Account SID
              </label>
              <input
                type="text"
                value={settings.twilioAccountSid}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    twilioAccountSid: e.target.value,
                  })
                }
                placeholder="AC..."
                className="w-full rounded border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition-colors hover:border-cyan-400/30 focus:border-cyan-400/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
                Auth Token
              </label>
              <input
                type="password"
                value={settings.twilioAuthToken}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    twilioAuthToken: e.target.value,
                  })
                }
                placeholder="••••••••••••••••"
                className="w-full rounded border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition-colors hover:border-cyan-400/30 focus:border-cyan-400/50 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="rounded border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-300 transition-colors hover:bg-cyan-500/20"
            >
              Update Credentials
            </button>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            WhatsApp Integration
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            WhatsApp Business API phone number and webhook settings.
          </p>
          <div className="mt-4 md:w-96">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={settings.whatsappPhoneNumber}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  whatsappPhoneNumber: e.target.value,
                })
              }
              className="w-full rounded border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition-colors hover:border-cyan-400/30 focus:border-cyan-400/50 focus:outline-none"
            />
            <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
              Format: +[country code] (XXX) XXX-XXXX
            </p>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            WebSocket Configuration
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Real-time bidirectional communication endpoint.
          </p>
          <div className="mt-4 md:w-96">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
              WebSocket URL
            </label>
            <input
              type="text"
              value={settings.webSocketUrl}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  webSocketUrl: e.target.value,
                })
              }
              className="w-full rounded border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition-colors hover:border-cyan-400/30 focus:border-cyan-400/50 focus:outline-none"
            />
            <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
              Format: wss://[hostname]/ws or ws://[hostname]/ws
            </p>
          </div>
        </article>

        <article className="rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
            Connection Tests
          </h3>
          <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
            Verify integration health and connectivity.
          </p>
          <div className="mt-4 space-y-2">
            <button
              type="button"
              className="w-full rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
            >
              Test OpenAI Connection
            </button>
            <button
              type="button"
              className="w-full rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
            >
              Test Twilio Connection
            </button>
            <button
              type="button"
              className="w-full rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
            >
              Test WebSocket Connection
            </button>
          </div>
        </article>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <button
            type="button"
            onClick={() => setConfirmSaveOpen(true)}
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

      <ConfirmationDialog
        isOpen={confirmSaveOpen}
        title="Save Integration Settings"
        message="Are you sure you want to save these integration settings? Updated API keys and credentials will be applied immediately."
        confirmLabel="Save"
        onConfirm={() => { setConfirmSaveOpen(false); void handleSave(); }}
        onCancel={() => setConfirmSaveOpen(false)}
      />
    </div>
  );
};

export default IntegrationSettingsPage;
