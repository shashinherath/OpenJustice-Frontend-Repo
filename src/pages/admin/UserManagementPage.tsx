import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/layout/AdminLayout";

type UserStatus = "Active" | "Blocked";

interface UserRecord {
  id: string;
  email: string;
  status: UserStatus;
  createdDate: string;
}

const INITIAL_USERS: UserRecord[] = [
  { id: "USR-1001", email: "janith.research@openjustice.org", status: "Active", createdDate: "2026-01-10" },
  { id: "USR-1002", email: "legal.team.lk@openjustice.org", status: "Blocked", createdDate: "2026-01-16" },
  { id: "USR-1003", email: "analyst.tamil@openjustice.org", status: "Active", createdDate: "2026-02-01" },
  { id: "USR-1004", email: "sinhala.reviewer@openjustice.org", status: "Active", createdDate: "2026-02-18" },
];

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
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);

  const activeCount = useMemo(
    () => users.filter(user => user.status === "Active").length,
    [users]
  );
  const blockedCount = users.length - activeCount;

  const handleBlockUser = (userId: string) => {
    setUsers(previous => previous.map(user => (user.id === userId ? { ...user, status: "Blocked" } : user)));
  };

  const handleUnblockUser = (userId: string) => {
    setUsers(previous => previous.map(user => (user.id === userId ? { ...user, status: "Active" } : user)));
  };

  return (
    <AdminLayout>
      <div className="space-y-8 p-8">
        <section className="rounded border border-white/10 bg-white/3 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">User Management</h2>
              <p className="mt-3 max-w-3xl text-sm text-slate-400">
                View user accounts and quickly block or unblock users using the simple admin controls.
              </p>
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Overview
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Total Users</p>
            <p className="mt-3 text-2xl font-black text-white">{users.length}</p>
          </article>
          <article className="rounded border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Active</p>
            <p className="mt-3 text-2xl font-black text-white">{activeCount}</p>
          </article>
          <article className="rounded border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Blocked</p>
            <p className="mt-3 text-2xl font-black text-white">{blockedCount}</p>
          </article>
        </section>

        <section className="rounded border border-white/10 bg-white/2 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Users</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{users.length} entries</span>
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
                {users.map(user => (
                  <tr key={user.id} className="border-b border-white/5">
                    <td className="px-3 py-3 text-slate-200">{user.id}</td>
                    <td className="px-3 py-3 text-slate-300">{maskEmail(user.email)}</td>
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
                    <td className="px-3 py-3 text-slate-400">{user.createdDate}</td>
                    <td className="px-3 py-3">
                      {user.status === "Active" ? (
                        <button
                          type="button"
                          onClick={() => handleBlockUser(user.id)}
                          className="rounded border border-red-400/30 bg-red-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/20"
                        >
                          Block user
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleUnblockUser(user.id)}
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
      </div>
    </AdminLayout>
  );
};

export default UserManagementPage;
