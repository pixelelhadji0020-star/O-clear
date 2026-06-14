import { useState, useEffect } from 'react'
import { Car, Wind, Home, ClipboardList, CalendarCheck, Sparkles, Phone, MapPin, Mail } from 'lucide-react'

// REMPLACER par votre vrai lien Calendly avant la mise en production
const CALENDLY_URL = 'https://calendly.com/sarrdigitalbrainner/lavage-standard--convoyage-oclear-'

const openCalendly = () => {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
  }
}

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallBanner(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setShowInstallBanner(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-cyan-400/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="O'Clear Lavage logo"
              className="h-10 w-auto rounded-md object-contain"
            />
            <span className="text-sky-400 font-bold text-lg tracking-tight">O'Clear Lavage</span>
          </div>
          <button
            onClick={openCalendly}
            className="bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Réserver un Lavage
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Élément décoratif : ligne de scan animée */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-[scan_4s_ease-in-out_infinite]"
            style={{ top: '40%' }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.05)_0%,_transparent_70%)]" />
        </div>

        <style>{`
          @keyframes scan {
            0%, 100% { transform: translateY(-40px); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(40px); opacity: 0; }
          }
        `}</style>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 md:py-36 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 leading-tight mb-6">
            Le nettoyage{' '}
            <span className="text-sky-400">professionnel</span>
            {' '}de votre véhicule,<br className="hidden md:block" />
            sans bouger de chez vous
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Lavage à domicile ou convoyage vers notre station — vous choisissez, on s'occupe du reste.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="bg-slate-800 border border-cyan-400/40 text-slate-200 text-sm font-medium px-4 py-2 rounded-full">
              🏠 À domicile
            </span>
            <span className="bg-slate-800 border border-cyan-400/40 text-slate-200 text-sm font-medium px-4 py-2 rounded-full">
              🚗 Convoyage
            </span>
          </div>

          <button
            onClick={openCalendly}
            className="bg-sky-500 hover:bg-sky-400 text-white font-bold text-base md:text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/25 hover:shadow-sky-400/30 hover:-translate-y-0.5"
          >
            Planifier mon nettoyage
          </button>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            Nos Services
          </h2>
          <p className="text-slate-500 text-center mb-14 max-w-xl mx-auto">
            Des prestations adaptées à chaque besoin, réalisées par des professionnels.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Carte 1 — Voitures */}
            <div className="bg-white rounded-2xl shadow-lg border-t-4 border-sky-400 p-8 flex flex-col gap-4">
              <Car size={48} className="text-sky-500" />
              <h3 className="text-xl font-bold text-slate-900">Voitures</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">✓</span>Lavage intérieur &amp; extérieur complet</li>
                <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">✓</span>Traitement et protection carrosserie</li>
                <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">✓</span>Disponible à domicile ou par convoyage</li>
              </ul>
            </div>

            {/* Carte 2 — Tapis & Moquettes */}
            <div className="bg-white rounded-2xl shadow-lg border-t-4 border-sky-400 p-8 flex flex-col gap-4">
              <Wind size={48} className="text-sky-500" />
              <h3 className="text-xl font-bold text-slate-900">Tapis &amp; Moquettes</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">✓</span>Aspiration en profondeur</li>
                <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">✓</span>Shampouinage &amp; désinfection</li>
                <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">✓</span>Séchage rapide garanti</li>
              </ul>
            </div>

            {/* Carte 3 — Canapés & Mobilier */}
            <div className="bg-white rounded-2xl shadow-lg border-t-4 border-sky-400 p-8 flex flex-col gap-4">
              <Home size={48} className="text-sky-500" />
              <h3 className="text-xl font-bold text-slate-900">Canapés &amp; Mobilier</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">✓</span>Nettoyage tissu et cuir</li>
                <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">✓</span>Traitement anti-taches</li>
                <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">✓</span>Intervention à domicile uniquement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="bg-slate-900 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-slate-400 text-center mb-16 max-w-xl mx-auto">
            Trois étapes simples pour un véhicule impeccable.
          </p>

          <div className="grid md:grid-cols-3 gap-0 relative">
            {/* Connecteurs en desktop */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px border-t-2 border-dashed border-cyan-400/40" />

            {[
              {
                icon: ClipboardList,
                step: '01',
                title: 'Choisissez votre formule',
                desc: 'Sélectionnez le service adapté à votre véhicule ou mobilier',
              },
              {
                icon: CalendarCheck,
                step: '02',
                title: 'Réservez votre créneau',
                desc: 'Choisissez la date et l\'heure qui vous conviennent via notre calendrier en ligne',
              },
              {
                icon: Sparkles,
                step: '03',
                title: 'On s\'occupe du reste',
                desc: 'Notre équipe intervient chez vous ou convoyez votre véhicule à la station',
              },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center px-8 pb-8 md:pb-0 relative">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-cyan-400/40 flex items-center justify-center mb-6 relative z-10">
                  <Icon size={36} className="text-cyan-400" />
                </div>
                <span className="text-xs font-bold text-sky-400 tracking-widest uppercase mb-2">Étape {step}</span>
                <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <button
              onClick={openCalendly}
              className="bg-transparent border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-900 font-bold text-base px-8 py-4 rounded-xl transition-all duration-200"
            >
              Prendre rendez-vous maintenant
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 border-t border-cyan-400/20 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="O'Clear Lavage logo"
              className="h-10 w-auto rounded-md object-contain"
            />
            <span className="text-sky-400 font-bold text-lg">O'Clear Lavage</span>
          </div>

          <p className="text-slate-400 italic text-sm">Le propre, livré chez vous.</p>

          <div className="flex flex-wrap justify-center gap-6 text-slate-300 text-sm">
            <a href="tel:+221775364084" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
              <Phone size={16} className="text-sky-400" />
              77 53 64 08 4
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-sky-400" />
              Dakar, Sénégal
            </span>
            <a href="mailto:oclear.lavage@gmail.com" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
              <Mail size={16} className="text-sky-400" />
              oclear.lavage@gmail.com
            </a>
          </div>

          <p className="text-slate-600 text-xs">
            © 2025 O'Clear Lavage. Tous droits réservés.
          </p>
        </div>
      </footer>

      {/* ── BANNIÈRE PWA ── */}
      {showInstallBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-sky-600 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <p className="text-sm font-medium">
            📱 Installez O'Clear sur votre écran d'accueil pour un accès rapide
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleInstall}
              className="bg-white text-sky-700 font-bold text-sm px-4 py-1.5 rounded-lg hover:bg-sky-50 transition-colors"
            >
              Installer
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="bg-sky-700 text-white font-medium text-sm px-4 py-1.5 rounded-lg hover:bg-sky-800 transition-colors"
            >
              Plus tard
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
