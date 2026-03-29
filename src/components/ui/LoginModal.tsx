import React, { useState } from "react";
import BrandLogo from "@/components/ui/BrandLogo";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClose = () => {
    setMode("login");
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "signup") {
      console.log("Sign up attempt:", { fullName, email, password, confirmPassword });
      return;
    }

    console.log("Login attempt:", { email, password });
    // Add your login logic here
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-110 bg-slate-700 dark:bg-zinc-800 rounded-2xl shadow-2xl p-8 md:p-10 border border-slate-600 dark:border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          onClick={handleClose}
          aria-label="Close login modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-slate-600 dark:bg-slate-200 rounded-full flex items-center justify-center mb-6 border border-slate-500 dark:border-slate-600">
            <BrandLogo containerClassName="w-full h-full flex items-center justify-center" iconClassName="text-yellow-400 dark:text-blue-300 text-3xl" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white dark:text-white mb-2">
            {mode === "signup" ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-slate-200 dark:text-slate-300 text-sm">
            {mode === "signup"
              ? "Create your OpenJustice account"
              : "Access the OpenJustice AI search suite"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="space-y-2">
              <label
                className="text-xs font-semibold uppercase tracking-widest text-slate-200 dark:text-slate-300"
                htmlFor="modal-full-name"
              >
                Full Name
              </label>
              <input
                className="w-full bg-zinc-600 dark:bg-zinc-900 border border-zinc-500 dark:border-zinc-600 rounded-lg py-3 px-4 text-white dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all outline-none"
                id="modal-full-name"
                placeholder="Jane Doe"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label
              className="text-xs font-semibold uppercase tracking-widest text-slate-200 dark:text-slate-300"
              htmlFor="modal-email"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">
                mail
              </span>
              <input
                className="w-full bg-zinc-600 dark:bg-zinc-900 border border-zinc-500 dark:border-zinc-600 rounded-lg py-3 pl-10 pr-4 text-white dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all outline-none"
                id="modal-email"
                placeholder="name@organization.org"
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
                className="text-xs font-semibold uppercase tracking-widest text-slate-200 dark:text-slate-300"
                htmlFor="modal-password"
              >
                Password
              </label>
              {mode === "login" && (
                <a
                  className="text-xs text-yellow-300 hover:text-yellow-200 dark:text-blue-300 dark:hover:text-blue-200 transition-colors font-medium"
                  href="#"
                >
                  Forgot Password?
                </a>
              )}
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">
                lock
              </span>
              <input
                className="w-full bg-zinc-600 dark:bg-zinc-900 border border-zinc-500 dark:border-zinc-600 rounded-lg py-3 pl-10 pr-11 text-white dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all outline-none"
                id="modal-password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <div className="space-y-2">
              <label
                className="text-xs font-semibold uppercase tracking-widest text-slate-200 dark:text-slate-300"
                htmlFor="modal-confirm-password"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="w-full bg-zinc-600 dark:bg-zinc-900 border border-zinc-500 dark:border-zinc-600 rounded-lg py-3 pl-4 pr-11 text-white dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all outline-none"
                  id="modal-confirm-password"
                  placeholder="••••••••"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white transition-colors"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span className="material-symbols-outlined text-[18px]">{showConfirmPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Login Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg"
            type="submit"
          >
            {mode === "signup" ? "Sign Up" : "Log In"}
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 pt-6 border-t border-slate-600 dark:border-slate-700 flex flex-col items-center gap-4">
          <p className="text-slate-300 dark:text-slate-400 text-sm">
            {mode === "signup" ? "Already have an account?" : "Don't have an account?"}
          </p>
          <button
            type="button"
            className="text-white dark:text-slate-200 font-semibold hover:text-blue-300 dark:hover:text-blue-300 underline underline-offset-4 transition-colors"
            onClick={() => setMode((prev) => (prev === "login" ? "signup" : "login"))}
          >
            {mode === "signup" ? "Log In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
