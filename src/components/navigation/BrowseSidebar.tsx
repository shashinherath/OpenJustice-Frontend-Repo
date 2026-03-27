import React, { useState, useRef, useEffect } from "react";

const BrowseSidebar: React.FC = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
        setHelpOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="w-72 hidden lg:flex flex-col border-r border-[#2d2d2d] bg-[#121212] relative">
      <div className="p-6 flex flex-col h-full">
        <div className="mb-8 flex-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 text-center border-b border-[#2d2d2d] pb-2">
            Research History
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 text-white border border-white/10 group cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-[20px] text-slate-400">history</span>
              <span className="text-sm font-medium truncate">Eviction Notice Rights</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">history</span>
              <span className="text-sm font-medium truncate">Employment Contract Review</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">history</span>
              <span className="text-sm font-medium truncate">Consumer Warranty Claim</span>
            </div>
          </div>
        </div>

        <div className="mt-auto relative" ref={menuRef}>
          <div
            className="flex items-center gap-3 p-3 rounded-xl bg-[#232323] border border-[#2d2d2d] hover:bg-[#2d2d2d] cursor-pointer transition-colors"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="size-9 rounded-full bg-slate-800 overflow-hidden ring-1 ring-white/10 shrink-0">
              <img
                alt="Profile Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB31jjVk870MqAYH6MSP3WPHU8f1lT5nvwyG_hnxAuTP1dTR1IOXC5YcROoLpMBq11iYQxBQEaupSBGpbvBa5AHmrSSmGKpYJclq5BAIV3S2aVQPre-nOq_-IJEPMcCaVeo8i_UTTA64Irvq6Iq96agZWgKe0O6ZOTCsFDDl_PyM42RXUVeS3YcqsFQ0MNsMXbKhIB3_OYJgq0Q1jcJsgW0iaibP6DnzFmV10gQZoBU7kjNDzvxBYQY-2RteqSGummnTm7D8u2uKPQ"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-sm font-bold truncate text-slate-100">J. Smith</p>
              <p className="text-[10px] text-slate-500 truncate uppercase font-semibold tracking-tight">
                ACTIVE SESSION
              </p>
            </div>
            <span className="material-symbols-outlined text-slate-500 text-lg">more_vert</span>
          </div>

          {profileOpen && (
            <div className="absolute bottom-full left-0 mb-3 w-64 bg-[#232323] rounded-xl shadow-2xl border border-[#2d2d2d] overflow-visible z-50">
              <div className="p-3 border-b border-[#2d2d2d]">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">User Account</p>
                <p className="text-sm font-bold text-white truncate">J. Smith</p>
              </div>
              <div className="p-2 space-y-0.5">
                <a
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2d2d2d] text-sm transition-colors text-slate-300 hover:text-white"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[20px] text-slate-500">person</span>
                  <span>Profile</span>
                </a>
                <a
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2d2d2d] text-sm transition-colors text-slate-300 hover:text-white"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[20px] text-slate-500">settings</span>
                  <span>Settings</span>
                </a>
                <div 
                    className="relative"
                    onMouseEnter={() => setHelpOpen(true)}
                    onMouseLeave={() => setHelpOpen(false)}
                >
                  <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-[#2d2d2d] text-sm cursor-pointer transition-colors text-slate-300 hover:text-white">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px] text-slate-500">help</span>
                      <span>Help</span>
                    </div>
                    <span className="material-symbols-outlined text-sm text-slate-500">chevron_right</span>
                  </div>
                  {helpOpen && (
                    <div className="absolute left-full bottom-0 ml-1 w-52 bg-[#232323] rounded-xl shadow-2xl border border-[#2d2d2d] p-2 space-y-0.5">
                      <a
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2d2d2d] text-sm transition-colors text-slate-300 hover:text-white"
                        href="#"
                      >
                        <span>Help Center</span>
                      </a>
                      <a
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2d2d2d] text-sm transition-colors text-slate-300 hover:text-white"
                        href="#"
                      >
                        <span>Terms and Policies</span>
                      </a>
                      <a
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2d2d2d] text-sm transition-colors text-slate-300 hover:text-white"
                        href="#"
                      >
                        <span>Release Notes</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-2 border-t border-[#2d2d2d]">
                <a
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-500 text-sm transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  <span className="font-semibold">Logout</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default BrowseSidebar;
