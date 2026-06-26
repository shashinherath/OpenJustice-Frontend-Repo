import React, { useEffect, useState } from "react";
import { useAdminUsersStore } from "@/stores/adminUsersStore";
import type { AdminUserItem } from "@/services/adminService";

const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) {
    return "***";
  }

  if (localPart.length <= 2) {
    return `${localPart[0] ?? "*"}***@${domain}`;
  }

  return `${localPart[0]}${"*".repeat(Math.max(localPart.length - 2, 3))}${localPart[localPart.length - 1]}@${domain}`;
};

const UserManagementPage: React.FC = () => {
  const { data, isLoading, error, fetchUsers, toggleUserStatus, addAdminUser } =
    useAdminUsersStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError("");
    if (!firstName || !lastName || !phoneNumber || !newEmail || !newPassword) {
      setModalError("Please provide all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await addAdminUser({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: newEmail,
        password: newPassword
      });
      setIsModalOpen(false);
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setNewEmail("");
      setNewPassword("");
    } catch (err: any) {
      setModalError(err.response?.data?.detail || err.message || "Failed to create admin user");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-64">
        <div className="text-cyan-400 animate-pulse font-bold tracking-widest uppercase text-sm">
          Loading User Data...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8">
        <div className="rounded border border-rose-500/30 bg-rose-500/10 p-6 text-rose-300">
          <h2 className="font-bold mb-2">Error Loading Users</h2>
          <p className="text-sm">{error || "No data available."}</p>
        </div>
      </div>
    );
  }

  const adminUsers = data.users.filter((u) => u.role === "admin");
  const regularUsers = data.users.filter((u) => u.role !== "admin");

  const renderTable = (usersList: AdminUserItem[], title: string) => (
    <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          {title}
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          {usersList.length} entries
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-widest text-slate-500">
              <th className="px-3 py-3 font-semibold">User ID</th>
              <th className="px-3 py-3 font-semibold">Email (masked)</th>
              <th className="px-3 py-3 font-semibold">Status</th>
              <th className="px-3 py-3 font-semibold">Created Date</th>
              <th className="px-3 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <tr key={user.id} className="border-b border-white/5">
                <td className="px-3 py-3 text-slate-200">{user.id}</td>
                <td className="px-3 py-3 text-slate-300">
                  {maskEmail(user.email)}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                      user.status === "Active"
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-300"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-slate-400">
                  {user.createdDate}
                </td>
                <td className="px-3 py-3">
                  {user.status === "Active" ? (
                    <button
                      type="button"
                      onClick={() => toggleUserStatus(user.id, user.status)}
                      className="rounded border border-red-400/30 bg-red-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/20"
                    >
                      Block user
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleUserStatus(user.id, user.status)}
                      className="rounded border border-green-400/30 bg-green-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-green-300 transition-colors hover:bg-green-500/20"
                    >
                      Unblock user
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              User Management
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300">
              View user accounts and quickly block or unblock users using the
              simple admin controls.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-300 transition-colors hover:bg-cyan-500/20"
          >
            Add Admin
          </button>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-slate-700 bg-[#121212] p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-bold text-white">Add New Admin User</h3>
            {modalError && (
              <div className="mb-4 rounded bg-rose-500/10 p-3 text-sm text-rose-400 border border-rose-500/20">
                {modalError}
              </div>
            )}
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-black/50 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-black/50 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-black/50 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="+1234567890"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-black/50 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-black/50 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Minimum 8 characters"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded border border-slate-600 bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded bg-cyan-600 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-cyan-500 disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Total Users
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {data.users.length}
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Active
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {data.total_active}
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Blocked
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {data.total_blocked}
          </p>
        </article>
      </section>

      {renderTable(adminUsers, "Admins")}
      
      {renderTable(regularUsers, "Users")}
    </div>
  );
};

export default UserManagementPage;
