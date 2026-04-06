import React, { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/stores/authStore";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const user = useAuthStore(state => state.user);
  const updateUser = useAuthStore(state => state.updateUser);

  const [username, setUsername] = useState(user?.name ?? "admin_user");
  const [email, setEmail] = useState(user?.email ?? "admin@openjustice.org");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const initials = useMemo(() => {
    return username
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }, [username]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setUsername(user?.name ?? "admin_user");
    setEmail(user?.email ?? "admin@openjustice.org");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
  }, [isOpen, user?.email, user?.name]);

  const handleSave = () => {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUsername || !trimmedEmail) {
      setErrorMessage("Username and email are required.");
      return;
    }

    if (password && password !== confirmPassword) {
      setErrorMessage("Password and confirm password do not match.");
      return;
    }

    setErrorMessage("");
    updateUser({ name: trimmedUsername, email: trimmedEmail });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-130 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#171717] text-zinc-100 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Edit profile"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <h2 className="text-base font-bold">Profile</h2>
          <button
            className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
            type="button"
            onClick={onClose}
            aria-label="Close profile"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="space-y-5 px-5 py-5">
          {errorMessage && (
            <p className="rounded-lg border border-red-700/50 bg-red-900/30 px-3 py-2 text-xs font-semibold text-red-300">
              {errorMessage}
            </p>
          )}

          {saved && (
            <p className="rounded-lg border border-emerald-700/50 bg-emerald-900/30 px-3 py-2 text-xs font-semibold text-emerald-300">
              Profile updated.
            </p>
          )}

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-900 text-sm font-bold text-zinc-300">
              <span>{initials || "AU"}</span>
            </div>
            <div className="text-xs text-zinc-400">Update account credentials for this admin profile.</div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Username</label>
            <input
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors focus:border-zinc-600"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Email</label>
            <input
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors focus:border-zinc-600"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Password</label>
            <input
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors focus:border-zinc-600"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Confirm Password</label>
            <input
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors focus:border-zinc-600"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-zinc-800 px-5 py-4">
          <button
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-300"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;