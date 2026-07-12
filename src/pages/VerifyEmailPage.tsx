import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BrandLogo from "@/components/ui/BrandLogo";
import { authService } from "@/services/authService";

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("No verification token provided.");
      return;
    }

    const verify = async () => {
      try {
        await authService.verifyEmail(token);
        setStatus("success");
      } catch (error: any) {
        console.error("Verification failed:", error);
        setStatus("error");
        setErrorMessage(
          error.response?.data?.message ||
          error.response?.data?.detail ||
          "Failed to verify email. The link may have expired or is invalid."
        );
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-[#191919] dark:via-zinc-800 dark:to-[#191919]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur dark:border-border-dark dark:bg-[#191919]/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            className="flex items-center gap-3 text-lg font-black tracking-tight text-slate-900 dark:text-white"
            to="/"
          >
            <BrandLogo
              containerClassName="flex size-9 items-center justify-center overflow-hidden rounded-lg bg-primary text-white dark:bg-white dark:text-primary"
              iconClassName="text-2xl"
            />
            <span>OpenJustice</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-700/50 p-8">
            <div className="text-center">
              {status === "loading" && (
                <div className="space-y-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <span className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-r-transparent dark:border-blue-400 dark:border-r-transparent" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Verifying Email...
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Please wait while we verify your email address.
                  </p>
                </div>
              )}

              {status === "success" && (
                <div className="space-y-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Email Verified!
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Your email has been successfully verified. You can now log in to your account.
                  </p>
                  <div className="pt-4">
                    <Link
                      to="/?login=true"
                      className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                      Go to Login
                    </Link>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="space-y-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    <span className="material-symbols-outlined text-4xl">error</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Verification Failed
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {errorMessage}
                  </p>
                  <div className="pt-4">
                    <Link
                      to="/?login=true"
                      className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyEmailPage;
