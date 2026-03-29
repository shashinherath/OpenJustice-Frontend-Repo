export type AppLanguage = "en" | "si" | "ta";

export const SUPPORTED_LANGUAGES: AppLanguage[] = ["en", "si", "ta"];

export const LANGUAGE_OPTIONS: Array<{ value: AppLanguage; label: string }> = [
  { value: "en", label: "English" },
  { value: "si", label: "Sinhala" },
  { value: "ta", label: "Tamil" },
];