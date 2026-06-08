import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   CONFIG — À PERSONNALISER
───────────────────────────────────────── */
const CALENDLY_URL = "https://calendly.com/votre-lien-ici"; // ← Remplacer par votre URL Calendly

/* ─────────────────────────────────────────
   LOGO O'CLEAR
───────────────────────────────────────── */
function Logo({ dark = false }) {
  return (
    <span className="flex items-center gap-2 select-none">
      {/* Goutte d'eau SVG */}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14 3 C14 3, 5 13, 5 18 C5 23, 9 26, 14 26 C19 26, 23 23, 23 18 C23 13, 14 3, 14 3Z"
          fill="url(#dropGrad)"
        />
        <path
          d="M10 20 C10 20, 10 16, 14 15"
          stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"
        />
        <defs>
          <linearGradient id="dropGrad" x1="5" y1="3" x2="23" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>
      </svg>
      <span className={`font-display font-bold text-xl tracking-tight ${dark ? "text-slate-900" : "text-white"}`}>
        O'<span className="text-sky-400">Clear</span>
        <span className={`font-normal ml-1 text-base ${dark ? "text-slate-500" : "text-sky-200/70"}`}>Lavage</span>
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────
   ICÔNES SVG INLINE
───────────────────────────────────────── */
const Icons = {
  Car: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M5 17H3v-5l2.5-5h13L21 12v5h-2M5 17h14M5 17a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 12h18" strokeLinecap="round"/>
    </svg>
  ),
  Rug: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="3" y="6" width="18" height="12" rx="2"/>
      <path d="M7 6v12M17 6v12M3 12h18M7 9h2M15 9h2M7 15h2M15 15h2" strokeLinecap="round"/>
    </svg>
  ),
  Sofa: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M20 9V7a2 2 0 00-2-2H6a2 2 0 00-2 2v2" strokeLinecap="round"/>
      <path d="M2 11a2 2 0 012 2v3h16v-3a2 2 0 012-2 2 2 0 00-2-2H4a2 2 0 00-2 2z" strokeLinecap="round"/>
      <path d="M6 16v2M18 16v2" strokeLinecap="round"/>
    </svg>
  ),
  Calendar: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Check: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Phone: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 10.8 19.79 19.79 0 01.14 2.18 2 2 0 012.12 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.12 6.12l1.27-.46a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round"/>
    </svg>
  ),
  Mail: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7" strokeLinecap="round"/>
    </svg>
  ),
  Pin: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M12 22s-8-6.5-8-12a8 8 0 1116 0c0 5.5-8 12-8 12z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Download: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  X: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
    </svg>
  ),
  Truck: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M1 3h15v13H1zM16 8h4l3 4v5h-7V8z" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  Star: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  Droplets: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 7.7 7 5c-.29 2.7-1.1 4.62-2.29 5.06C3.57 10 3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
      <path d="M12.56 6.6A10.97 10.97 0 0014 3.02c.5 2.5 2 4.9 4 6.5s3 3.99 3 6c0 4.05-3.6 7-8 7a7.7 7.7 0 01-3.44-.77"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────
   COMPOSANT : MODAL CALENDLY
───────────────────────────────────────── */
function CalendlyModal({ open, onClose }) {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!open) return;
    if (!scriptLoaded.current) {
      // Charge le CSS Calendly
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      // Charge le script Calendly
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        scriptLoaded.current = true;
        if (window.Calendly) {
          window.Calendly.initInlineWidget({
            url: CALENDLY_URL,
            parentElement: document.getElementById("calendly-inline-container"),
            prefill: {},
            utm: {},
          });
        }
      };
      document.head.appendChild(script);
    } else if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: document.getElementById("calendly-inline-container"),
        prefill: {},
        utm: {},
      });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-modal-in">
        {/* Header modal */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a192f] border-b border-sky-900/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center">
              <Icons.Calendar className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Planifier mon nettoyage</p>
              <p className="text-sky-400/70 text-xs">Choisissez votre créneau en 30 secondes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <Icons.X className="w-4 h-4" />
          </button>
        </div>

        {/* Iframe Calendly */}
        <div
          id="calendly-inline-container"
          className="w-full"
          style={{ minHeight: 500, height: "60vh" }}
        >
          {/* Fallback si JS non chargé */}
          <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400 p-8 text-center">
            <Icons.Calendar className="w-12 h-12 text-sky-300/50" />
            <p className="text-sm">Chargement du calendrier…</p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 underline text-sm hover:text-sky-400"
            >
              Ouvrir dans un onglet
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   COMPOSANT : BANNER PWA
───────────────────────────────────────── */
function InstallBanner() {
  const [prompt, setPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-4 right-4 z-40 animate-slide-up">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-sky-900/20 border border-sky-200/40">
        {/* Fond glassmorphism clair */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" />
        <div className="relative flex items-center gap-3 p-4">
          {/* Icône */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-sky-300/40">
            <Icons.Droplets className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-800 text-sm font-semibold leading-tight">Installer O'Clear</p>
            <p className="text-slate-500 text-xs mt-0.5">Accès rapide depuis votre écran d'accueil</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={async () => {
                if (!prompt) return;
                await prompt.prompt();
                const { outcome } = await prompt.userChoice;
                if (outcome === "accepted") setVisible(false);
              }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold shadow-md shadow-sky-300/40 active:scale-95 transition-transform"
            >
              Installer
            </button>
            <button
              onClick={() => setVisible(false)}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors"
            >
              <Icons.X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   COMPOSANT : CARTE SERVICE
───────────────────────────────────────── */
function ServiceCard({ icon: Icon, title, subtitle, features, delay }) {
  return (
    <div
      className="group relative bg-white rounded-3xl p-6 border border-slate-100
        hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100/50
        transition-all duration-500 animate-fade-up overflow-hidden"
      style={{ animationDelay: delay }}
    >
      {/* Coin décoratif */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-50 to-transparent rounded-bl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icône */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0a192f] to-sky-800 flex items-center justify-center mb-5 shadow-lg shadow-sky-900/20 group-hover:shadow-sky-400/30 transition-shadow duration-500">
        <Icon className="w-7 h-7 text-sky-300" />
      </div>

      <h3 className="text-slate-900 font-display font-bold text-xl mb-1">{title}</h3>
      <p className="text-sky-600 text-xs font-semibold tracking-wider uppercase mb-4">{subtitle}</p>

      <ul className="space-y-2.5">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-500">
            <span className="w-4 h-4 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icons.Check className="w-2.5 h-2.5 text-sky-600" />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────
   COMPOSANT PRINCIPAL
───────────────────────────────────────── */
export default function App() {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Enregistrement Service Worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").catch(() => {});
      });
    }
  }, []);

  // Header scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openCalendly = () => setCalendlyOpen(true);

  const SERVICES = [
    {
      icon: Icons.Car,
      title: "Véhicules",
      subtitle: "Auto & Moto",
      features: [
        "Nettoyage intérieur & extérieur complet",
        "Traitement carrosserie & polish",
        "Lavage à domicile sur rendez-vous",
        "Formule convoyage vers station partenaire",
      ],
      delay: "0.1s",
    },
    {
      icon: Icons.Rug,
      title: "Tapis & Moquettes",
      subtitle: "Textiles sol",
      features: [
        "Aspiration professionnelle en profondeur",
        "Shampouinage haute mousse",
        "Désinfection & neutralisation d'odeurs",
        "Séchage rapide garanti",
      ],
      delay: "0.2s",
    },
    {
      icon: Icons.Sofa,
      title: "Canapés & Plus",
      subtitle: "Mobilier tissu & cuir",
      features: [
        "Nettoyage tissu et cuir à domicile",
        "Traitement anti-tache",
        "Désinfection complète",
        "Restitution d'aspect neuf",
      ],
      delay: "0.3s",
    },
  ];

  const STEPS = [
    {
      num: "01",
      icon: Icons.Car,
      title: "Choisissez votre formule",
      desc: "À domicile pour votre confort, ou convoyage vers nos stations partenaires. Vous décidez.",
    },
    {
      num: "02",
      icon: Icons.Calendar,
      title: "Bloquez votre créneau",
      desc: "Réservez en 30 secondes via notre calendrier en ligne. Pas d'appel, pas d'attente.",
    },
    {
      num: "03",
      icon: Icons.Droplets,
      title: "Nos pros s'occupent du reste",
      desc: "Nos techniciens prennent en charge votre véhicule ou mobilier avec soin et précision.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-body antialiased">

      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300
          ${scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm shadow-slate-200/50"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Logo dark={scrolled} />
          <button
            onClick={openCalendly}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 active:scale-95
              ${scrolled
                ? "bg-[#0a192f] text-white hover:bg-sky-800 shadow-md shadow-slate-300/40"
                : "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
              }`}
          >
            Réserver un Lavage
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a192f]">

        {/* Fond : vagues animées */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Orbes de lumière */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-700/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-0 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl" />

          {/* Grille subtile */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Vagues en bas */}
          <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 160" preserveAspectRatio="none">
            <path d="M0,80 C360,160 720,0 1080,80 C1260,120 1380,60 1440,80 L1440,160 L0,160 Z" fill="#f8fafc" />
          </svg>
        </div>

        {/* Contenu hero */}
        <div className="relative max-w-5xl mx-auto px-5 pt-28 pb-36 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-sky-300 text-xs font-semibold tracking-wider">Service Professionnel · Dakar, Sénégal</span>
          </div>

          <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl leading-[1.1] tracking-tight mb-6 animate-fade-up">
            Le nettoyage professionnel
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-400">
              sans bouger de chez vous.
            </span>
          </h1>

          <p className="text-sky-200/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Lavage à domicile sur rendez-vous ou service de{" "}
            <span className="text-sky-300 font-medium">convoyage sécurisé</span>{" "}
            vers nos stations partenaires. Votre véhicule ou votre mobilier, remis à neuf.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-up" style={{ animationDelay: "0.25s" }}>
            <button
              onClick={openCalendly}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl
                bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400
                text-white font-bold text-sm tracking-wide shadow-xl shadow-sky-500/30
                transition-all duration-300 active:scale-95"
            >
              <Icons.Calendar className="w-4 h-4" />
              Planifier mon nettoyage
            </button>
            <a
              href="tel:+221775364084"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl
                border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm
                text-white/80 hover:text-white font-medium text-sm
                transition-all duration-300 active:scale-95"
            >
              <Icons.Phone className="w-4 h-4" />
              77 53 64 08 4
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 mt-12 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => (
                <Icons.Star key={i} className="w-3.5 h-3.5 text-amber-400" />
              ))}
            </div>
            <span className="text-sky-300/50 text-xs">|</span>
            <span className="text-sky-200/50 text-xs">Résultats garantis · 100% pro</span>
            <span className="text-sky-300/50 text-xs">|</span>
            <div className="flex items-center gap-1.5 text-sky-200/50 text-xs">
              <Icons.Truck className="w-3.5 h-3.5" />
              Déplacement inclus
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-5 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sky-500 text-xs font-bold tracking-[0.3em] uppercase mb-3">Ce que nous faisons</p>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl sm:text-4xl leading-tight">
            Des prestations haut de gamme,<br />à votre porte.
          </h2>
          <p className="text-slate-500 text-base mt-4 max-w-md mx-auto">
            Trois pôles d'expertise couvrant tous vos besoins de nettoyage professionnel à Dakar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="py-20 relative overflow-hidden">
        {/* Fond bleu marine avec vagues */}
        <div className="absolute inset-0 bg-[#0a192f]" />
        <svg className="absolute top-0 left-0 right-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,0 L0,0 Z" fill="#f8fafc" />
        </svg>
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,0 720,80 1080,40 C1260,20 1380,60 1440,40 L1440,80 L0,80 Z" fill="#f8fafc" />
        </svg>

        <div className="relative max-w-5xl mx-auto px-5 pt-12 pb-12">
          <div className="text-center mb-12">
            <p className="text-sky-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">Simple & rapide</p>
            <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl">
              Comment ça marche ?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative text-center animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                {/* Connecteur */}
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[calc(50%+2.5rem)] right-0 h-px bg-gradient-to-r from-sky-500/40 to-transparent" />
                )}

                {/* Numéro */}
                <div className="relative inline-flex mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-sky-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cyan-400 text-[#0a192f] text-[10px] font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-display font-bold text-white text-base mb-2">{step.title}</h3>
                <p className="text-sky-200/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA central */}
          <div className="text-center mt-12">
            <button
              onClick={openCalendly}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl
                bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400
                text-white font-bold text-sm tracking-wide shadow-xl shadow-sky-500/30
                transition-all duration-300 active:scale-95"
            >
              <Icons.Calendar className="w-4 h-4" />
              Réserver maintenant — C'est gratuit
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-100 border-t border-slate-200/60 py-10 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <Logo dark />
              <p className="text-slate-500 text-sm mt-2 max-w-xs leading-relaxed">
                Le nettoyage professionnel à domicile, à Dakar.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { icon: Icons.Phone, label: "77 53 64 08 4", href: "tel:+221775364084" },
                { icon: Icons.Mail, label: "oclear.lavage@gmail.com", href: "mailto:oclear.lavage@gmail.com" },
                { icon: Icons.Pin, label: "Dakar, Sénégal", href: null },
              ].map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  {href ? (
                    <a href={href} className="text-slate-600 text-sm hover:text-sky-600 transition-colors">{label}</a>
                  ) : (
                    <span className="text-slate-600 text-sm">{label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-slate-400 text-xs">© 2025 O'Clear Lavage. Tous droits réservés.</p>
            <p className="text-slate-400 text-xs">Service professionnel · Dakar, Sénégal</p>
          </div>
        </div>
      </footer>

      {/* ── CALENDLY MODAL ── */}
      <CalendlyModal open={calendlyOpen} onClose={() => setCalendlyOpen(false)} />

      {/* ── PWA INSTALL BANNER ── */}
      <InstallBanner />

      {/* ── STYLES GLOBAUX & ANIMATIONS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .font-display { font-family: 'Syne', sans-serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0);      }
        }

        .animate-fade-in   { animation: fade-in  0.6s ease-out both; }
        .animate-fade-up   { animation: fade-up  0.7s ease-out both; }
        .animate-slide-up  { animation: slide-up 0.4s ease-out both; }
        .animate-modal-in  { animation: modal-in 0.3s ease-out both; }
      `}</style>
    </div>
  );
}
