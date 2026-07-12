import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/ui/BrandLogo";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";
import { LANGUAGE_OPTIONS } from "@/constants/languages";
import { useRecaptcha } from "@/hooks/useRecaptcha";

const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    preferredLanguage: "en",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { executeRecaptcha } = useRecaptcha();

  const login = useAuthStore((state) => state.login);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("signupErrorFirstNameRequired");
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t("signupErrorLastNameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("signupErrorEmailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("signupErrorInvalidEmail");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("signupErrorPhoneRequired");
    }

    if (!formData.password) {
      newErrors.password = t("signupErrorPasswordRequired");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(
        formData.password,
      )
    ) {
      newErrors.password = t("signupErrorPasswordCriteria");
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("signupErrorPasswordsMismatch");
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = t("signupErrorAgreeTerms");
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const recaptchaToken = await executeRecaptcha('signup');

      const response = await authService.register({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone.trim(),
        password: formData.password,
        preferred_language: formData.preferredLanguage,
        recaptcha_token: recaptchaToken,
      });

      const { data, message } = response;
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Sign up failed:", error);
      setErrors({
        form:
          error.response?.data?.message ||
          error.response?.data?.detail ||
          t("signupErrorGeneric"),
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="w-full max-w-2xl">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-700/50 p-8 md:p-12">
            {/* Form Header */}
            {!isSuccess && (
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-4xl border dark:border-zinc-700">
                  <BrandLogo
                    containerClassName="flex h-15 w-15 items-center justify-center rounded-full bg-primary text-white dark:bg-white dark:text-primary"
                    iconClassName="text-2xl"
                  />
                </div>
                <h1 className="mb-2 text-3xl font-black text-slate-900 dark:text-white">
                  {t("createAccount")}
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  {t("signupSubtitle")}
                </p>
              </div>
            )}

            {isSuccess ? (
              <div className="text-center py-8 space-y-6">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <span className="material-symbols-outlined text-4xl">mark_email_read</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Check your email
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  We've sent a verification link to <span className="font-semibold text-slate-900 dark:text-white">{formData.email}</span>. 
                  Please verify your email address to activate your account.
                </p>
                <div className="pt-4">
                  <Link
                    to="/?login=true"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Go to Login
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Error Message */}
                {errors.form && (
                  <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
                    {errors.form}
                  </div>
                )}


            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {t("firstName")}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={t("firstNamePlaceholder")}
                    className={`w-full rounded-lg border ${
                      errors.firstName
                        ? "border-red-500"
                        : "border-slate-300 dark:border-slate-600"
                    } bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:placeholder-slate-400`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {t("lastName")}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={t("lastNamePlaceholder")}
                    className={`w-full rounded-lg border ${
                      errors.lastName
                        ? "border-red-500"
                        : "border-slate-300 dark:border-slate-600"
                    } bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:placeholder-slate-400`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Phone Row */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {t("emailAddress")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("emailPlaceholder")}
                    className={`w-full rounded-lg border ${
                      errors.email
                        ? "border-red-500"
                        : "border-slate-300 dark:border-slate-600"
                    } bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:placeholder-slate-400`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {t("phoneNumber")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t("phonePlaceholder")}
                    className={`w-full rounded-lg border ${
                      errors.phone
                        ? "border-red-500"
                        : "border-slate-300 dark:border-slate-600"
                    } bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:placeholder-slate-400`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Password & Confirm Password Row */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {t("password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className={`w-full rounded-lg border ${
                        errors.password
                          ? "border-red-500"
                          : "border-slate-300 dark:border-slate-600"
                      } bg-white px-4 py-2.5 pr-11 text-slate-900 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:placeholder-slate-400`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {errors.password}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {t("passwordCriteria")}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {t("confirmPassword")}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className={`w-full rounded-lg border ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-slate-300 dark:border-slate-600"
                      } bg-white px-4 py-2.5 pr-11 text-slate-900 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:placeholder-slate-400`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white transition-colors"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showConfirmPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Preferred Language */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t("preferredLanguage", "Preferred Language")}
                </label>
                <div className="relative">
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                    className="w-full appearance-none rounded-lg border border-slate-300 dark:border-slate-600 bg-white px-4 py-2.5 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
                  >
                    {LANGUAGE_OPTIONS.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 dark:text-slate-400">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
                />
                <label className="text-sm text-slate-600 dark:text-slate-400">
                  {t("agreeToTermsPrefix")}{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {t("privacyPolicyLabel")}
                  </a>{" "}
                  {t("and")}{" "}
                  <a
                    href="/terms-of-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {t("termsOfServiceLabel")}
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {errors.agreeToTerms}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-r-transparent" />
                )}
                {isLoading ? t("creatingAccount") : t("createAccount")}
              </button>

              {/* Disclaimer */}
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-300">
                <strong>{t("disclaimer")}</strong> {t("disclaimerText")}
              </div>
            </form>
            </>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
