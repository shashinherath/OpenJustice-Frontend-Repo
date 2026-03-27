import React, { useState } from 'react';

const Sidebar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);

    return (
        <aside className="w-64 border-r border-slate-200 dark:border-border-dark flex flex-col justify-between bg-white dark:bg-brand-bg relative shrink-0">
            <div className="flex flex-col gap-6 p-4">
                <div className="flex gap-3 items-center">
                    <div className="bg-primary dark:bg-slate-200 rounded-lg size-10 flex items-center justify-center overflow-hidden">
                        <span className="material-symbols-outlined text-white dark:text-[#191919] scale-125">balance</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-base font-bold leading-none text-slate-900 dark:text-white">OpenJustice</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-normal">Legal AI Research</p>
                    </div>
                </div>
                
                <div className="flex flex-col gap-1">
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-black dark:hover:bg-white transition-colors mb-4">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        <span className="text-sm font-medium">New Question</span>
                    </button>
                    
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">Query History</div>
                    
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-100 dark:bg-surface-dark cursor-pointer border border-slate-200 dark:border-border-dark">
                            <span className="material-symbols-outlined text-[18px] text-slate-600 dark:text-slate-400">history</span>
                            <p className="text-sm font-medium truncate text-slate-900 dark:text-white">Tenant rights in CA</p>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-surface-dark cursor-pointer transition-colors text-slate-600 dark:text-slate-400">
                            <span className="material-symbols-outlined text-[18px]">history</span>
                            <p className="text-sm font-normal truncate">IP protection for software</p>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-surface-dark cursor-pointer transition-colors text-slate-600 dark:text-slate-400">
                            <span className="material-symbols-outlined text-[18px]">history</span>
                            <p className="text-sm font-normal truncate">Employment law basics</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-border-dark">
                <div className="relative profile-menu">
                    <button 
                        className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-surface-dark transition-colors group text-slate-900 dark:text-white text-left focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-300 dark:border-slate-600 shrink-0">
                            <span className="material-symbols-outlined text-[20px] text-slate-600 dark:text-slate-300">account_circle</span>
                        </div>
                        <div className="flex flex-col items-start overflow-hidden">
                            <span className="text-sm font-semibold truncate">J. Smith</span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Researcher</span>
                        </div>
                        <span className="material-symbols-outlined text-[16px] ml-auto text-slate-400 dark:text-slate-500">more_vert</span>
                    </button>

                    {menuOpen && (
                        <div className="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl py-2 z-[100]">
                            <div className="px-4 py-2 border-b border-slate-100 dark:border-border-dark mb-1">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Signed in as</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">jsmith@university.edu</p>
                            </div>
                            
                            <a className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors" href="#">
                                <span className="material-symbols-outlined text-[18px]">settings</span>
                                Settings
                            </a>
                            
                            <div 
                                className="relative help-item group/help"
                                onMouseEnter={() => setHelpOpen(true)}
                                onMouseLeave={() => setHelpOpen(false)}
                            >
                                <div className="flex items-center justify-between px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[18px]">help_outline</span>
                                        Help
                                    </div>
                                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                </div>
                                
                                {helpOpen && (
                                    <div className="absolute left-full bottom-0 ml-1 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl py-2">
                                        <a className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors" href="#">Help Center</a>
                                        <a className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors" href="#">Terms and Policies</a>
                                        <a className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors" href="#">Release Notes</a>
                                    </div>
                                )}
                            </div>
                            
                            <div className="my-1 border-t border-slate-100 dark:border-border-dark"></div>
                            
                            <a className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-border-dark transition-colors" href="#">
                                <span className="material-symbols-outlined text-[18px]">logout</span>
                                Logout
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
