import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import BrandLogo from "@/components/ui/BrandLogo";
import { ADMIN_MENU_ITEMS, type AdminMenuGroup } from "@/constants/admin-flow";
import { useAuthStore } from "@/stores/authStore";
import { getMediaUrl } from "@/utils/urlUtils";
import { useSettingsModal } from "@/hooks/common/useSettingsModal";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { openProfile } = useSettingsModal();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      settings: location.pathname.startsWith("/admin/settings"),
      analytics: location.pathname.startsWith("/admin/analytics"),
    },
  );
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleOpenProfile = () => {
    setProfileMenuOpen(false);
    openProfile();
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
    <aside className={`flex h-full min-h-0 flex-col overflow-hidden border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#191919] transition-all duration-200 ${isCollapsed ? "w-20" : "w-70"}`}>
      {/* Header: logo + name */}
      <div className={`flex-none ${isCollapsed ? "p-3" : "px-6 pt-6 pb-4"}`}>
        {isCollapsed ? (
          <div className="flex justify-center">
            <button
              className="group relative flex size-10 items-center justify-center cursor-pointer"
              type="button"
              onClick={() => setIsCollapsed(false)}
              aria-label="Expand sidebar"
            >
              <div className="transition-opacity group-hover:opacity-0">
                <BrandLogo
                  containerClassName="bg-primary dark:bg-slate-200 rounded-lg size-10 flex items-center justify-center overflow-hidden"
                  iconClassName="text-white dark:text-[#191919] scale-125"
                />
              </div>
              <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-[28px] text-slate-900 opacity-0 transition-opacity group-hover:opacity-100 dark:text-white">
                dock_to_right
              </span>
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <BrandLogo
                  containerClassName="bg-primary dark:bg-slate-200 rounded-lg size-10 flex items-center justify-center overflow-hidden"
                  iconClassName="text-white dark:text-[#191919] scale-125"
                />
                <Link to="/">
                  <h2 className="text-2xl font-bold leading-none text-slate-900 dark:text-white">
                    OpenJustice
                  </h2>
                </Link>
              </div>
              <button
                className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-white/10 dark:bg-transparent dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white cursor-pointer"
                type="button"
                onClick={() => setIsCollapsed(true)}
                aria-label="Collapse sidebar"
              >
                <span className="material-symbols-outlined text-[18px] text-slate-400 dark:text-slate-500">
                  dock_to_right
                </span>
              </button>
            </div>
            <p className="mt-3 px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Administration
            </p>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className={`min-h-0 flex-1 overflow-y-auto pb-6 space-y-1 ${isCollapsed ? "px-2" : "px-4"}`}>
        {ADMIN_MENU_ITEMS.map((item) => {
          if ("children" in item) {
            const group = item as AdminMenuGroup;
            const isExpanded = expandedGroups[group.key];
            const isActive = isItemActive(group.path) || isGroupActive(group);

            if (isCollapsed) {
              return (
                <NavLink
                  key={group.key}
                  to={group.path}
                  title={group.navLabel}
                  className={({ isActive: navIsActive }) =>
                    `flex items-center justify-center rounded px-3 py-2.5 transition-colors ${
                      navIsActive || isActive
                        ? "bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                    }`
                  }
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {group.icon}
                  </span>
                </NavLink>
              );
            }

            return (
              <div key={group.key}>
                <NavLink
                  to={group.path}
                  end={group.path === "/admin/settings"}
                  onClick={() => toggleGroup(group.key)}
                  aria-expanded={isExpanded}
                  aria-controls={`${group.key}-children`}
                  className={({ isActive: navIsActive }) =>
                    `flex items-center justify-between gap-2 rounded px-3 py-2.5 transition-colors ${
                      navIsActive || isActive
                        ? "bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                    }`
                  }
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">
                      {group.icon}
                    </span>
                    <span className="text-sm font-medium">
                      {group.navLabel}
                    </span>
                  </div>

                  <span
                    className={`material-symbols-outlined text-[18px] transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </NavLink>

                {isExpanded && group.children && (
                  <div
                    id={`${group.key}-children`}
                    className="ml-4 mt-1 space-y-1 border-l border-slate-200 dark:border-white/10 pl-3"
                  >
                    {group.children.map((child) => (
                      <NavLink
                        key={child.key}
                        to={child.path}
                        className={({ isActive: navIsActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                            navIsActive
                              ? "bg-cyan-100 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300"
                              : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-slate-200"
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

          return (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === "/admin"}
              title={isCollapsed ? item.navLabel : undefined}
              className={({ isActive }) =>
                `flex items-center rounded transition-colors ${isCollapsed ? "justify-center px-3 py-2.5" : "gap-3 px-3 py-2.5"} ${
                  isActive
                    ? "bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">
                {item.icon}
              </span>
              {!isCollapsed && (
                <span
                  className={`text-sm ${item.path === "/admin" ? "font-semibold" : "font-medium"}`}
                >
                  {item.navLabel}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="shrink-0 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#191919] p-4">
        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setProfileMenuOpen((prev) => !prev)}
            className={`flex w-full items-center rounded-md px-2 py-2 text-left transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white ${isCollapsed ? "justify-center" : "gap-3"}`}
            aria-label="Open profile menu"
            aria-haspopup="menu"
            aria-expanded={profileMenuOpen}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5">
              {user?.avatarUrl ? (
                <img
                  src={getMediaUrl(user.avatarUrl)}
                  alt="Admin avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-slate-700 dark:text-white">
                  account_circle
                </span>
              )}
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="truncate text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    System Overseer
                  </p>
                </div>
                <span className="material-symbols-outlined text-[16px] text-slate-400 dark:text-slate-500">
                  more_vert
                </span>
              </>
            )}
          </button>

          {profileMenuOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-full overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111111] shadow-2xl shadow-black/10 dark:shadow-black/40">
              <button
                type="button"
                onClick={handleOpenProfile}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 dark:text-slate-200 transition-colors hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px] text-cyan-600 dark:text-cyan-300">
                  person
                </span>
                <div className="flex flex-1 flex-col items-start">
                  <span className="font-medium">Profile</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    Open account details popup
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 border-t border-slate-200 dark:border-white/10 px-4 py-3 text-left text-sm text-rose-600 dark:text-rose-200 transition-colors hover:bg-rose-500/10 hover:text-rose-700 dark:hover:text-rose-100"
              >
                <span className="material-symbols-outlined text-[18px] text-rose-500 dark:text-rose-300">
                  logout
                </span>
                <div className="flex flex-1 flex-col items-start">
                  <span className="font-medium">Logout</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    Sign out of the admin panel
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
