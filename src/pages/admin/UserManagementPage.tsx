import React, { useEffect } from "react";
import AdminLayout from "@/layout/AdminLayout";
import { useAdminUsersStore } from "@/stores/adminUsersStore";

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
  const { data, isLoading, error, fetchUsers, toggleUserStatus } = useAdminUsersStore();

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-8 flex justify-center items-center h-64">
          <div className="text-cyan-400 animate-pulse font-bold tracking-widest uppercase text-sm">
            Loading User Data...
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !data) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="rounded border border-rose-500/30 bg-rose-500/10 p-6 text-rose-300">
            <h2 className="font-bold mb-2">Error Loading Users</h2>
            <p className="text-sm">{error || "No data available."}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 p-8">
        <section className="rounded border border-cyan-400/20 bg-[#191919] p-6">
          <div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">User Management</h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300">
              View user accounts and quickly block or unblock users using the simple admin controls.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Total Users</p>
            <p className="mt-3 text-2xl font-black text-white">{data.users.length}</p>
          </article>
          <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Active</p>
            <p className="mt-3 text-2xl font-black text-white">{data.total_active}</p>
          </article>
          <article className="rounded border border-slate-700/70 bg-[#191919] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Blocked</p>
            <p className="mt-3 text-2xl font-black text-white">{data.total_blocked}</p>
          </article>
        </section>

        <section className="rounded border border-slate-700/70 bg-[#191919] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Users</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{data.users.length} entries</span>
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
                {data.users.map(user => (
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
      </div>
    </AdminLayout>
  );
};

export default UserManagementPage;
