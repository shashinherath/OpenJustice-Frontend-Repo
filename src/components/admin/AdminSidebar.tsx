import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BrandLogo from "@/components/ui/BrandLogo";
import { ADMIN_MODULES } from "@/constants/admin-flow";
import { useAuthStore } from "@/stores/authStore";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-70 flex flex-col border-r border-white/10 bg-[#191919]">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <BrandLogo
            containerClassName="flex h-10 w-10 items-center rounded-md bg-primary dark:bg-slate-200"
            iconClassName="text-white dark:text-[#191919] scale-125"
            imageClassName="h-10 w-10 object-contain"
          />
          <Link to="/">
            <h2 className="text-xl font-black leading-tight tracking-[0.15em] text-white">OPENJUSTICE</h2>
          </Link>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Administration</p>
        {ADMIN_MODULES.map(module => (
          <NavLink
            key={module.key}
            to={module.path}
            end={module.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">{module.icon}</span>
            <span className={`text-sm ${module.path === "/admin" ? "font-semibold" : "font-medium"}`}>{module.navLabel}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 bg-white/2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden">
            <span className="material-symbols-outlined text-white">account_circle</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Admin User</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest truncate">System Overseer</p>
          </div>
          <button className="text-slate-500 hover:text-white" type="button" onClick={handleLogout} aria-label="Logout">
            <span className="material-symbols-outlined text-sm">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
