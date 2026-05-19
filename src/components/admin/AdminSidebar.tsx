import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import BrandLogo from "@/components/ui/BrandLogo";
import { ADMIN_MENU_ITEMS, type AdminMenuGroup } from "@/constants/admin-flow";
import { useAuthStore } from "@/stores/authStore";
import { useSettingsModal } from "@/hooks/common/useSettingsModal";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const { openProfile } = useSettingsModal();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      settings: location.pathname.startsWith("/admin/settings"),
      analytics: location.pathname.startsWith("/admin/analytics"),
    },
  );

  useEffect(() => {
    if (location.pathname.startsWith("/admin/settings")) {
      setExpandedGroups((prev) => ({
        ...prev,
        settings: true,
      }));
    }

    if (location.pathname.startsWith("/admin/analytics")) {
      setExpandedGroups((prev) => ({
        ...prev,
        analytics: true,
      }));
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isGroupActive = (group: AdminMenuGroup) => {
    return group.children?.some((child) => location.pathname === child.path);
  };

  const isItemActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-70 flex h-full min-h-0 flex-col overflow-hidden border-r border-white/10 bg-[#191919]">
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <BrandLogo
            containerClassName="flex h-10 w-10 items-center rounded-md bg-primary dark:bg-slate-200"
            iconClassName="text-white dark:text-[#191919] scale-125"
            imageClassName="h-10 w-10 object-contain"
          />
          <Link to="/">
            <h2 className="text-xl font-black leading-tight tracking-[0.15em] text-white">
              OPENJUSTICE
            </h2>
          </Link>
        </div>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Administration
        </p>
        {ADMIN_MENU_ITEMS.map((item) => {
          if ("children" in item) {
            // Render collapsible group
            const group = item as AdminMenuGroup;
            const isExpanded = expandedGroups[group.key];
            const isActive = isItemActive(group.path) || isGroupActive(group);

            return (
              <div key={group.key}>
                <div
                  className={`flex items-center justify-between gap-2 rounded px-3 py-2.5 transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <NavLink
                    to={group.path}
                    end={group.path === "/admin/settings"}
                    className="flex min-w-0 flex-1 items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {group.icon}
                    </span>
                    <span className="text-sm font-medium">
                      {group.navLabel}
                    </span>
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.key)}
                    className="rounded p-1 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                    aria-label={`${isExpanded ? "Collapse" : "Expand"} ${group.navLabel}`}
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                </div>

                {/* Collapsible children */}
                {isExpanded && group.children && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
                    {group.children.map((child) => (
                      <NavLink
                        key={child.key}
                        to={child.path}
                        className={({ isActive: navIsActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                            navIsActive
                              ? "bg-cyan-500/15 text-cyan-300"
                              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                          }`
                        }
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {child.icon}
                        </span>
                        <span className="font-medium">{child.navLabel}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Render regular module
          return (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">
                {item.icon}
              </span>
              <span
                className={`text-sm ${
                  item.path === "/admin" ? "font-semibold" : "font-medium"
                }`}
              >
                {item.navLabel}
              </span>
            </NavLink>
          );
        })}
      </nav>
      <div className="shrink-0 border-t border-white/10 bg-[#191919] p-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openProfile}
            className="flex flex-1 items-center gap-3 rounded-md px-2 py-2 text-left transition-colors duration-200 hover:bg-white/10 hover:text-white"
            aria-label="Open profile settings"
          >
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded">
              <span className="material-symbols-outlined text-white">
                account_circle
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-white">
                Admin User
              </p>
              <p className="truncate text-[10px] uppercase tracking-widest text-slate-500">
                System Overseer
              </p>
            </div>
          </button>
          <button
            className="text-slate-400 hover:text-white"
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
