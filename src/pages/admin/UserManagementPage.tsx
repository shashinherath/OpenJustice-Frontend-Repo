import React, { useEffect, useState, useMemo } from "react";
import { useAdminUsersStore } from "@/stores/adminUsersStore";
import type { AdminUserItem } from "@/services/adminService";
import { getMediaUrl } from "@/utils/urlUtils";

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

/* ── Standalone table card with its own local search/filter state ── */
const UserTableCard: React.FC<{
  usersList: AdminUserItem[];
  title: string;
  showAddButton?: boolean;
  onAddAdmin?: () => void;
  onViewUser: (user: AdminUserItem) => void;
  onToggleStatus: (userId: string, currentStatus: "Active" | "Blocked") => Promise<void>;
}> = ({ usersList, title, showAddButton = false, onAddAdmin, onViewUser, onToggleStatus }) => {
  const [localSearch, setLocalSearch] = useState("");
  const [localStatusFilter, setLocalStatusFilter] = useState("All");

  const filteredUsers = useMemo(() => {
    let result = usersList;

    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      result = result.filter(
        (u) =>
          (u.first_name ?? "").toLowerCase().includes(q) ||
          (u.last_name ?? "").toLowerCase().includes(q) ||
          (u.email ?? "").toLowerCase().includes(q) ||
          (u.phone_number ?? "").toLowerCase().includes(q)
      );
    }

    if (localStatusFilter !== "All") {
      result = result.filter((u) => u.status === localStatusFilter);
    }

    return result;
  }, [usersList, localSearch, localStatusFilter]);

  return (
    <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            {title}
          </h3>
          {showAddButton && onAddAdmin && (
            <button
              onClick={onAddAdmin}
              className="rounded border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-300 transition-colors hover:bg-cyan-500/20"
            >
              Add Admin
            </button>
          )}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          {filteredUsers.length} of {usersList.length} entries
        </span>
      </div>

      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full sm:w-64 rounded border border-cyan-400/20 bg-black/30 px-3 py-2 text-sm text-slate-300 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
        />
        <select
          value={localStatusFilter}
          onChange={(e) => setLocalStatusFilter(e.target.value)}
          className="w-full sm:w-48 rounded border border-cyan-400/20 bg-[#191919] px-3 py-2 text-sm text-slate-300 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>
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
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-sm text-slate-500">
                  No users match your search.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
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
                    <button
                      type="button"
                      onClick={() => onViewUser(user)}
                      className="rounded border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-300 transition-colors hover:bg-cyan-500/20 mr-2"
                    >
                      View
                    </button>
                    {user.status === "Active" ? (
                      <button
                        type="button"
                        onClick={() => onToggleStatus(user.id, user.status)}
                        className="rounded border border-red-400/30 bg-red-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/20"
                      >
                        Block user
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onToggleStatus(user.id, user.status)}
                        className="rounded border border-green-400/30 bg-green-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-green-300 transition-colors hover:bg-green-500/20"
                      >
                        Unblock user
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const UserManagementPage: React.FC = () => {
  const { 
    data, isLoading, error, fetchUsers, toggleUserStatus, addAdminUser
  } = useAdminUsersStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedViewUser, setSelectedViewUser] = useState<AdminUserItem | null>(null);
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

  if (isLoading && !data) {
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

  const handleViewUser = (user: AdminUserItem) => {
    setSelectedViewUser(user);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-8 p-8">
      <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="mt-2 flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                User Management
              </h2>
              {isLoading && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 animate-pulse">
                  Loading...
                </span>
              )}
            </div>
            <p className="mt-3 max-w-3xl text-sm text-slate-300">
              View user accounts and quickly block or unblock users using the
              simple admin controls.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Total Users
          </p>
          <p className="mt-3 text-2xl font-black text-white">
            {data.users.length}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Total users in the system.
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Active
          </p>
          <p className="mt-3 text-2xl font-black text-emerald-300">
            {data.total_active}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Users with active access.
          </p>
        </article>
        <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
            Blocked
          </p>
          <p className="mt-3 text-2xl font-black text-red-300">
            {data.total_blocked}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Users currently suspended.
          </p>
        </article>
      </section>

      <UserTableCard
        usersList={adminUsers}
        title="Admin Users"
        showAddButton
        onAddAdmin={() => setIsModalOpen(true)}
        onViewUser={handleViewUser}
        onToggleStatus={toggleUserStatus}
      />

      <UserTableCard
        usersList={regularUsers}
        title="Regular Users"
        onViewUser={handleViewUser}
        onToggleStatus={toggleUserStatus}
      />

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

      {isViewModalOpen && selectedViewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-slate-700 bg-[#121212] p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4 border-b border-slate-700/70 pb-4">
              <h3 className="text-lg font-bold text-white">User Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800">
                {selectedViewUser.avatar_url ? (
                  <img
                    src={getMediaUrl(selectedViewUser.avatar_url)}
                    alt={`${selectedViewUser.first_name || ""} ${selectedViewUser.last_name || ""}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-3xl text-slate-400">
                    person
                  </span>
                )}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">
                  {selectedViewUser.first_name} {selectedViewUser.last_name}
                </h4>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {selectedViewUser.role}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">User ID</p>
                <p className="text-sm font-semibold text-slate-200 break-all">{selectedViewUser.id}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Name</p>
                <p className="text-sm font-semibold text-slate-200">{selectedViewUser.first_name} {selectedViewUser.last_name}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Email</p>
                <p className="text-sm font-semibold text-slate-200">{selectedViewUser.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Phone Number</p>
                <p className="text-sm font-semibold text-slate-200">{selectedViewUser.phone_number}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Role</p>
                  <p className="text-sm font-semibold text-slate-200 capitalize">{selectedViewUser.role}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Status</p>
                  <span
                    className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                      selectedViewUser.status === "Active"
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-300"
                    }`}
                  >
                    {selectedViewUser.status}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Created Date</p>
                  <p className="text-sm font-semibold text-slate-200">{selectedViewUser.createdDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserManagementPage;

