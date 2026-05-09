export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
  preferences?: {
    language?: string;
    theme?: "light" | "dark" | "system";
  };
}
