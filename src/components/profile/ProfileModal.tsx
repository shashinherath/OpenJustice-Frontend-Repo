import React, { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/stores/authStore";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const user = useAuthStore((state) => state.user);
  const updateProfileFromBackend = useAuthStore(
    (state) => state.updateProfileFromBackend,
  );
  const changePassword = useAuthStore((state) => state.changePassword);

  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] ?? "");
  const [lastName, setLastName] = useState(
    user?.name?.split(" ").slice(1).join(" ") ?? "",
  );
  const [email, setEmail] = useState(user?.email ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const initials = useMemo(() => {
    const fullName = `${firstName} ${lastName}`.trim();
    return fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }, [firstName, lastName]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFirstName(user?.name?.split(" ")[0] ?? "");
    setLastName(user?.name?.split(" ").slice(1).join(" ") ?? "");
    setEmail(user?.email ?? "");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");
  }, [isOpen, user?.email, user?.name]);

  const handleSave = async () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedFirstName || !trimmedEmail) {
      setErrorMessage("First name and email are required.");
      return;
    }

    // If password change is attempted
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setErrorMessage("All password fields are required.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMessage("New password and confirm password do not match.");
        return;
      }

      if (newPassword.length < 8) {
        setErrorMessage("New password must be at least 8 characters.");
        return;
      }
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const fullName =
        trimmedLastName && trimmedFirstName
          ? `${trimmedFirstName} ${trimmedLastName}`
          : trimmedFirstName;

      // Update profile
      await updateProfileFromBackend({
        name: fullName,
        email: trimmedEmail,
      });

      // Change password if provided
      if (currentPassword && newPassword) {
        await changePassword(currentPassword, newPassword);
        // Clear password fields after successful change
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }

      setSaved(true);
      window.setTimeout(() => setSaved(false), 1600);
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Failed to save profile";
      setErrorMessage(errorMsg);
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-130 flex items-center justify-center bg-black/60 p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-[min(82vh,calc(100vh-3rem))] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#191919] text-zinc-100 shadow-2xl sm:h-[min(82vh,calc(100vh-4rem))]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Edit profile"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-[#121212] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-zinc-300">
              person
            </span>
            <h2 className="text-base font-bold tracking-tight text-zinc-100 sm:text-lg">
              User Profile
            </h2>
          </div>
          <button
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            disabled={isLoading}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          <div className="space-y-5">
            {errorMessage && (
              <p className="rounded-lg border border-red-700/50 bg-red-900/30 px-3 py-2 text-xs font-semibold text-red-300">
                {errorMessage}
              </p>
            )}

            {saved && (
              <p className="rounded-lg border border-emerald-700/50 bg-emerald-900/30 px-3 py-2 text-xs font-semibold text-emerald-300">
                Profile updated successfully.
              </p>
            )}

            <section className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-900 text-sm font-bold text-zinc-300">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt="User avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{initials || "AU"}</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-100">
                    {`${firstName} ${lastName}`.trim() || "Anonymous User"}
                  </p>
                  <p className="text-xs text-zinc-400">
                    Update account details and password securely.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-white/10 bg-black/30 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Basic Information
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    First Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-cyan-500/50 disabled:opacity-50"
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Last Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-cyan-500/50 disabled:opacity-50"
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Email
                </label>
                <input
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-cyan-500/50 disabled:opacity-50"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isLoading}
                />
              </div>
            </section>

            <section className="rounded-xl border border-white/10 bg-black/30 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Change Password (Optional)
              </h3>

              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Current Password
                  </label>
                  <input
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-cyan-500/50 disabled:opacity-50"
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      New Password
                    </label>
                    <input
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-cyan-500/50 disabled:opacity-50"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Confirm Password
                    </label>
                    <input
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-cyan-500/50 disabled:opacity-50"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-zinc-800 bg-[#121212] px-4 py-3 sm:px-6">
          <button
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 disabled:opacity-50"
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="rounded-lg border border-cyan-400/30 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-200 transition-colors hover:bg-cyan-500/25 disabled:opacity-50"
            type="button"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ProfileModal;
