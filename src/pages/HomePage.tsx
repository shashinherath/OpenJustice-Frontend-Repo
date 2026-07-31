import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/stores/authStore";
import FeatureCard from "@/components/ui/FeatureCard";
import LoginModal from "@/components/ui/LoginModal";
import ConstellationBackground from "@/components/ui/ConstellationBackground";

type HeroMotion = {
  x: number;
  y: number;
  active: boolean;
};

const heroParticles = [
  {
    left: "8%",
    top: "18%",
    size: 18,
    depthX: 28,
    depthY: 16,
    depthZ: 120,
    className: "bg-sky-400/60 dark:bg-sky-300/35",
  },
  {
    left: "16%",
    top: "72%",
    size: 12,
    depthX: 18,
    depthY: 22,
    depthZ: -70,
    className: "bg-blue-300/70 dark:bg-blue-200/40",
  },
  {
    left: "30%",
    top: "14%",
    size: 10,
    depthX: 12,
    depthY: 10,
    depthZ: 160,
    className: "bg-white/80 dark:bg-slate-100/60",
  },
  {
    left: "42%",
    top: "28%",
    size: 22,
    depthX: 20,
    depthY: 14,
    depthZ: 48,
    className: "bg-cyan-300/45 dark:bg-cyan-200/25",
  },
  {
    left: "52%",
    top: "64%",
    size: 14,
    depthX: 16,
    depthY: 24,
    depthZ: -130,
    className: "bg-slate-400/60 dark:bg-slate-200/30",
  },
  {
    left: "64%",
    top: "20%",
    size: 28,
    depthX: -20,
    depthY: 18,
    depthZ: 22,
    className: "bg-blue-500/20 dark:bg-blue-300/10",
  },
  {
    left: "72%",
    top: "46%",
    size: 11,
    depthX: -14,
    depthY: 12,
    depthZ: 200,
    className: "bg-white/70 dark:bg-white/45",
  },
  {
    left: "81%",
    top: "18%",
    size: 16,
    depthX: -24,
    depthY: 14,
    depthZ: 90,
    className: "bg-sky-300/55 dark:bg-sky-200/30",
  },
  {
    left: "86%",
    top: "68%",
    size: 20,
    depthX: -18,
    depthY: 20,
    depthZ: -90,
    className: "bg-blue-400/45 dark:bg-blue-300/25",
  },
  {
    left: "22%",
    top: "46%",
    size: 8,
    depthX: 10,
    depthY: 16,
    depthZ: 260,
    className: "bg-white/70 dark:bg-slate-200/45",
  },
  {
    left: "58%",
    top: "82%",
    size: 9,
    depthX: 14,
    depthY: -18,
    depthZ: -180,
    className: "bg-sky-200/70 dark:bg-sky-100/40",
  },
  {
    left: "38%",
    top: "78%",
    size: 14,
    depthX: 22,
    depthY: -16,
    depthZ: 72,
    className: "bg-cyan-200/55 dark:bg-cyan-100/30",
  },
];

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);
  const loadProfile = useAuthStore((state) => state.loadProfile);
  const clearSession = useAuthStore((state) => state.clearSession);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [heroMotion, setHeroMotion] = useState<HeroMotion>({
    x: 0,
    y: 0,
    active: false,
  });

  // Load user profile from backend if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadProfile().catch((error) => {
        console.error("Failed to load profile:", error);
        // Don't treat profile load failure as critical - user can continue
      });
    }
  }, [isAuthenticated, loadProfile]);

  useEffect(() => {
    const sessionExpired =
      window.sessionStorage.getItem("oj-auth-session-expired") === "1";

    if (!sessionExpired && searchParams.get("login") !== "1") {
      return;
    }

    clearSession();
    window.sessionStorage.removeItem("oj-auth-session-expired");
  }, [clearSession, searchParams]);

  useEffect(() => {
    const openLoginModal = () => {
      clearSession();
      window.sessionStorage.removeItem("oj-auth-session-expired");
      setIsLoginOpen(true);
    };

    window.addEventListener("oj:open-login-modal", openLoginModal);

    return () => {
      window.removeEventListener("oj:open-login-modal", openLoginModal);
    };
  }, [clearSession]);

  // Redirect authenticated users away from login
  useEffect(() => {
    if (isAuthenticated && searchParams.get("login") === "1") {
      navigate(userRole === "admin" ? "/admin" : "/chat", { replace: true });
    }
  }, [isAuthenticated, userRole, searchParams, navigate]);

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
    if (searchParams.has("login") || searchParams.has("redirect")) {
      const next = new URLSearchParams(searchParams);
      next.delete("login");
      next.delete("redirect");
      setSearchParams(next, { replace: true });
    }
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate(userRole === "admin" ? "/admin" : "/chat");
      return;
    }

    setIsLoginOpen(true);
  };

  const handleHeroPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) {
      return;
    }

    const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    setHeroMotion({
      x: Math.max(-1, Math.min(1, normalizedX)),
      y: Math.max(-1, Math.min(1, normalizedY)),
      active: true,
    });
  };

  const handleHeroPointerLeave = () => {
    setHeroMotion({ x: 0, y: 0, active: false });
  };

  const isLoginModalOpen =
    isLoginOpen || (!isAuthenticated && searchParams.get("login") === "1");

  // Feature card data built with translations
  const features = [
    {
      icon: "verified_user",
      iconBg: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
      title: t("privateAndSecure"),
      description: t("privateDescription"),
      userAvatar: "/user1.png",
      chat: {
        userMsg: t("isMyDataShared"),
        botMsg: t("dataSecurity"),
      },
    },
    {
      icon: "translate",
      iconBg: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      title: t("plainLanguage"),
      description: t("plainDescription"),
      userAvatar: "/user2.png",
      chat: {
        userMsg: t("forceMajeure"),
        botMsg: t("forceMajeureExplanation"),
      },
    },
    {
      icon: "library_books",
      iconBg: "bg-orange-50 dark:bg-orange-900/20",
      iconColor: "text-orange-600 dark:text-orange-400",
      title: t("comprehensive"),
      description: t("comprehensiveDescription"),
      userAvatar: "/user3.png",
      chat: {
        userMsg: t("smallClaimsCase"),
        botMsg: t("smallClaimsSteps"),
      },
    },
  ];

  return (
    <>
      <div
        className="relative isolate flex-1 overflow-hidden px-4 py-16 md:px-10 md:py-24 lg:px-40"
        style={{ perspective: "1800px" }}
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={handleHeroPointerLeave}
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          <ConstellationBackground className="opacity-90 dark:opacity-75" />
          <div
            className="absolute left-1/2 top-24 h-176 w-176 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18)_0%,rgba(14,165,233,0.10)_30%,rgba(255,255,255,0)_72%)] blur-3xl transition-transform duration-200 ease-out dark:bg-[radial-gradient(circle,rgba(96,165,250,0.14)_0%,rgba(34,211,238,0.08)_30%,rgba(255,255,255,0)_72%)] md:h-216 md:w-216"
            style={{
              transform: `translate3d(calc(-50% + ${heroMotion.x * 48}px), ${heroMotion.y * 24}px, 120px) rotateX(${heroMotion.y * -2}deg) rotateY(${heroMotion.x * 3}deg)`,
            }}
          />
          <div
            className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl transition-transform duration-200 ease-out dark:bg-sky-300/10"
            style={{
              transform: `translate3d(${heroMotion.x * -26}px, ${heroMotion.y * -16}px, 60px)`,
            }}
          />
          <div
            className="absolute -right-28 top-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl transition-transform duration-200 ease-out dark:bg-blue-400/10"
            style={{
              transform: `translate3d(${heroMotion.x * 20}px, ${heroMotion.y * 22}px, -40px)`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.03)_0,transparent_1px)] bg-size-[28px_28px] opacity-45 dark:bg-[radial-gradient(circle_at_center,rgba(226,232,240,0.10)_0,transparent_1px)]" />
          {heroParticles.map((particle, index) => (
            <span
              key={`${particle.left}-${particle.top}-${index}`}
              className={`absolute rounded-full shadow-[0_0_30px_rgba(59,130,246,0.18)] transition-transform duration-200 ease-out will-change-transform ${particle.className}`}
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                transform: `translate3d(calc(-50% + ${heroMotion.x * particle.depthX}px), calc(-50% + ${heroMotion.y * particle.depthY}px), ${particle.depthZ}px)`,
                opacity: heroMotion.active ? 1 : 0.8,
              }}
            />
          ))}
          <div
            className="absolute left-1/2 top-1/2 h-168 w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 opacity-30 transition-transform duration-200 ease-out dark:border-white/10 md:h-208 md:w-208"
            style={{
              transform: `translate3d(calc(-50% + ${heroMotion.x * 12}px), calc(-50% + ${heroMotion.y * 12}px), -100px)`,
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center gap-16">
          {/* Hero Section */}
          <section className="relative flex flex-col items-center gap-8 max-w-4xl py-4 md:py-10">
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35 blur-3xl dark:bg-slate-950/20" />
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 backdrop-blur dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
              {t("homeBadge")}
            </div>

            {/* Headline */}
            <h1 className="text-slate-900 dark:text-white text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              {t("homeHeroTitleLine1")}
              <br className="hidden md:block" /> {t("homeHeroTitleLine2")}
            </h1>

            {/* Subheading */}
            <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl leading-relaxed max-w-3xl font-light">
              {t("homeHeroDescription")}
            </p>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 max-w-2xl text-left">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-500 shrink-0">
                info
              </span>
              <div>
                <p className="text-sm text-amber-800 dark:text-amber-400 leading-snug">
                  <strong className="font-bold">{t("disclaimer")}</strong>{" "}
                  {t("disclaimerText")}
                </p>
                <Link
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-700 hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-200 transition-colors cursor-pointer"
                  to="/privacy-policy"
                  target="_blank"
                >
                  {t("readPrivacyPolicy")}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleGetStarted}
                className="flex w-full sm:w-auto min-w-50 h-14 items-center justify-center gap-2 rounded-xl bg-primary dark:bg-white dark:text-primary hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.98] text-white text-lg font-bold shadow-xl transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined">chat_bubble</span>
                <span>{t("askQuestion")}</span>
              </button>
              <Link
                to="/topics"
                className="flex w-full sm:w-auto min-w-50 h-14 items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-lg font-bold transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined">grid_view</span>
                <span>{t("browseTopics")}</span>
              </Link>
            </div>
          </section>

          {/* WhatsApp & Web Chat Showcase */}
          <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-4">
            <div className="rounded-3xl border border-green-200 bg-linear-to-br from-green-50 to-emerald-100 p-8 text-left shadow-sm dark:border-green-900/30 dark:from-[#0d1f14] dark:to-[#112a1c] relative overflow-hidden group transition-all hover:border-green-400/50">
              <div className="absolute -right-6 -top-6 text-green-500/10 dark:text-green-400/5 transition-transform duration-500 group-hover:scale-110">
                <span className="material-symbols-outlined text-[150px]">
                  chat
                </span>
              </div>
              <div className="relative z-10">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg shadow-green-500/30">
                  <span className="material-symbols-outlined text-[28px]">
                    phone_iphone
                  </span>
                </div>
                <h2 className="mb-3 text-2xl font-black tracking-tight text-green-950 dark:text-green-50">
                  {t("whatsAppIntegration")}
                </h2>
                <p className="text-base leading-relaxed text-green-800/80 dark:text-green-200/70 mb-8">
                  {t("whatsAppDesc")}
                </p>
                <button
                  onClick={handleGetStarted}
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-green-700 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    qr_code_scanner
                  </span>
                  {t("connectOnWhatsApp")}
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-200 bg-linear-to-br from-blue-50 to-indigo-100 p-8 text-left shadow-sm dark:border-blue-900/30 dark:from-[#0d1627] dark:to-[#111c33] relative overflow-hidden group transition-all hover:border-blue-400/50">
              <div className="absolute -right-6 -top-6 text-blue-500/10 dark:text-blue-400/5 transition-transform duration-500 group-hover:scale-110">
                <span className="material-symbols-outlined text-[150px]">
                  forum
                </span>
              </div>
              <div className="relative z-10">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                  <span className="material-symbols-outlined text-[28px]">
                    laptop_mac
                  </span>
                </div>
                <h2 className="mb-3 text-2xl font-black tracking-tight text-blue-950 dark:text-blue-50">
                  {t("immersiveWebChat")}
                </h2>
                <p className="text-base leading-relaxed text-blue-800/80 dark:text-blue-200/70 mb-8">
                  {t("immersiveWebChatDesc")}
                </p>
                <button
                  onClick={handleGetStarted}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chat_bubble
                  </span>
                  {t("startWebChat")}
                </button>
              </div>
            </div>
          </section>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>

          <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm dark:border-slate-700 dark:bg-surface-dark md:p-8">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {t("learnMore")}
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {t("homeLearnMoreHeading")}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {t("homeLearnMoreDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
              <Link
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-[#232323] dark:hover:border-slate-600 dark:hover:bg-slate-800 cursor-pointer"
                to="/about-us"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300">
                  <span className="material-symbols-outlined text-[22px]">
                    info
                  </span>
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">
                  {t("aboutUs")}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t("homeAboutCardDescription")}
                </p>
              </Link>

              <Link
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-[#232323] dark:hover:border-slate-600 dark:hover:bg-slate-800 cursor-pointer"
                to="/contact"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300">
                  <span className="material-symbols-outlined text-[22px]">
                    support_agent
                  </span>
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">
                  {t("contact")}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t("homeContactCardDescription")}
                </p>
              </Link>

              <Link
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-[#232323] dark:hover:border-slate-600 dark:hover:bg-slate-800 cursor-pointer"
                to="/terms-of-service"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300">
                  <span className="material-symbols-outlined text-[22px]">
                    description
                  </span>
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">
                  {t("termsOfService")}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t("homeTermsCardDescription")}
                </p>
              </Link>

              <Link
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-[#232323] dark:hover:border-slate-600 dark:hover:bg-slate-800 cursor-pointer"
                to="/research"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-300">
                  <span className="material-symbols-outlined text-[22px]">
                    search
                  </span>
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">
                  {t("research")}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t("homeResearchCardDescription")}
                </p>
              </Link>

              <Link
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-[#232323] dark:hover:border-slate-600 dark:hover:bg-slate-800 cursor-pointer"
                to="/developers"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300">
                  <span className="material-symbols-outlined text-[22px]">
                    code
                  </span>
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">
                  {t("developers")}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t("homeDevelopersCardDescription")}
                </p>
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* Login Modal - Triggered by Ask a Question or URL params */}
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLogin} />
    </>
  );
};

export default HomePage;
