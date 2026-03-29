import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    caseCategory: "",
    caseDetails: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const caseCategories = [
    "Land & Property",
    "Employment Law",
    "Family Rights",
    "Consumer Protection",
    "Criminal Justice",
    "Intellectual Property",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.caseCategory) {
      newErrors.caseCategory = "Please select a case category";
    }

    if (!formData.caseDetails.trim()) {
      newErrors.caseDetails = "Please describe your case";
    } else if (formData.caseDetails.length < 20) {
      newErrors.caseDetails = "Case description must be at least 20 characters";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Store user data (in a real app, this would go to backend)
      console.log("User data:", formData);
      
      // Redirect to chat page
      navigate("/chat");
    } catch (error) {
      console.error("Sign up failed:", error);
      setErrors({ form: "Sign up failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-[#191919] dark:via-slate-900 dark:to-[#191919]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur dark:border-border-dark dark:bg-[#191919]/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="text-lg font-black tracking-tight text-slate-900 dark:text-white" to="/">
            OpenJustice
          </Link>   
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800/50 p-8 md:p-12">
            {/* Form Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <span className="material-symbols-outlined text-3xl text-blue-600 dark:text-blue-400">person_add</span>
              </div>
              <h1 className="mb-2 text-3xl font-black text-slate-900 dark:text-white">Create Your Account</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Get started with OpenJustice and access legal research tools
              </p>
            </div>

            {/* Error Message */}
            {errors.form && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
                {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full rounded-lg border ${
                    errors.fullName ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                  } bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.fullName}</p>
                )}
              </div>

              {/* Email & Phone Row */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full rounded-lg border ${
                      errors.email ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                    } bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full rounded-lg border ${
                      errors.phone ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                    } bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Password & Confirm Password Row */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full rounded-lg border ${
                      errors.password ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                    } bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full rounded-lg border ${
                      errors.confirmPassword ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                    } bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Case Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Case Category
                </label>
                <select
                  name="caseCategory"
                  value={formData.caseCategory}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border ${
                    errors.caseCategory ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                  } bg-white px-4 py-2.5 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white`}
                >
                  <option value="">Select a case category</option>
                  {caseCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.caseCategory && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.caseCategory}</p>
                )}
              </div>

              {/* Case Details */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Tell us about your case
                </label>
                <textarea
                  name="caseDetails"
                  value={formData.caseDetails}
                  onChange={handleInputChange}
                  placeholder="Describe your legal situation in detail..."
                  rows={5}
                  className={`w-full rounded-lg border ${
                    errors.caseDetails ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                  } bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400`}
                />
                <div className="mt-2 flex justify-between">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Minimum 20 characters
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {formData.caseDetails.length} / 2000
                  </p>
                </div>
                {errors.caseDetails && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.caseDetails}</p>
                )}
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
                  I agree to the{" "}
                  <Link to="/privacy-policy" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Privacy Policy
                  </Link>
                  {" "}and{" "}
                  <Link to="/terms-of-service" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Terms of Service
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-xs text-red-600 dark:text-red-400">{errors.agreeToTerms}</p>
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
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>

              {/* Disclaimer */}
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-300">
                <strong>Important:</strong> OpenJustice is an AI-powered educational tool. We provide legal
                information, not legal advice. Please consult a qualified attorney for your specific situation.
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
