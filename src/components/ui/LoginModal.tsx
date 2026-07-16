import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/ui/BrandLogo";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent rendering if already authenticated
  if (isAuthenticated) {
    return null;
  }

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setError(null);
    onClose();
  };

  const handleSignUpClick = () => {
    handleClose();
    navigate("/signup");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({
        email: email.trim().toLowerCase(),
        password,
      });

      const { data } = response;
      const fallbackName = data.first_name
        ? `${data.first_name} ${data.last_name || ""}`.trim()
        : email.split("@")[0] || "User";

      login(
        {
          id: data.uuid,
          name: fallbackName,
          email,
          role: data.role,
          preferences: {
            language: data.preferred_language,
          },
        },
        data.access_token || `token-${Date.now()}`,
      );

      // Determine redirect path based on user role
      let redirectPath = new URLSearchParams(location.search).get("redirect");
      if (!redirectPath) {
        redirectPath = data.role === "admin" ? "/admin" : "/chat";
      }
      handleClose();
      navigate(redirectPath);
    } catch (err: any) {
      console.error("Login failed:", err);
      // Typically backend returns 422 for validation, or 401 for unauthorized
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Invalid login credentials. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-110 rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-zinc-800 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          onClick={handleClose}
          aria-label={t("closeLoginModal")}
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-950 rounded-full flex items-center justify-center mb-6 border border-slate-200 dark:border-zinc-800 p-3 shadow-sm">
            <BrandLogo
              containerClassName="w-full h-full flex items-center justify-center overflow-hidden"
              iconClassName="text-blue-600 dark:text-blue-300 text-3xl"
              imageClassName="h-full w-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            {t("loginWelcomeBack")}
          </h1>
          <p className="text-slate-500 dark:text-slate-300 text-sm">
            {t("loginSubtitle")}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-800 dark:text-red-200 text-center">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label
              className="text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-300"
              htmlFor="modal-email"
            >
              {t("emailAddress")}
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">
                mail
              </span>
              <input
                className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-600 rounded-lg py-3 pl-10 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all outline-none"
                id="modal-email"
                placeholder={t("emailPlaceholder")}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                className="text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-300"
                htmlFor="modal-password"
              >
                {t("password")}
              </label>
              <a
                className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200 transition-colors font-medium"
                href="#"
              >
                {t("forgotPassword")}
              </a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">
                lock
              </span>
              <input
                className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-600 rounded-lg py-3 pl-10 pr-11 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all outline-none"
                id="modal-password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-300 dark:hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
            ) : (
              <>
                {t("logIn")}
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {t("dontHaveAccount")}
          </p>
          <button
            type="button"
            className="text-slate-900 dark:text-slate-200 font-semibold hover:text-blue-600 dark:hover:text-blue-300 underline underline-offset-4 transition-colors"
            onClick={handleSignUpClick}
          >
            {t("createAccount")}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default LoginModal;
