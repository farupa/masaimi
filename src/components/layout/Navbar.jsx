import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiGlobe } from "react-icons/fi";
import Seal from "../common/Seal";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t("home") },
    { to: "/members", label: t("members") },
  ];
  if (user?.role === "member") {
    links.push({ to: "/submit-receipt", label: t("submitReceipt") });
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <Seal size={40} label="MSM" spin={false} tone="forest" />
          <div className="leading-tight">
            <div className="font-display font-semibold text-lg text-forest">MASAIMI</div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50">Savings Society</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.label} to={l.to} className="text-sm font-medium text-ink/70 hover:text-forest">
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-xs font-semibold text-forest border border-forest/20 rounded-full px-3 py-1.5 hover:bg-forest/5"
          >
            <FiGlobe size={14} /> {lang === "en" ? "বাংলা" : "English"}
          </button>

          {!user && <Button as={Link} to="/login" variant="primary">{t("login")}</Button>}

          {user?.role === "member" && (
            <Link to="/dashboard" className="flex items-center gap-3 rounded-full border border-forest/15 pl-1 pr-4 py-1 hover:border-forest/40">
              <div className="h-8 w-8 rounded-full bg-forest text-cream flex items-center justify-center font-display text-sm">
                {user.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-ink">{t("dashboard")}</span>
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" className="text-sm font-semibold text-forest border border-forest/20 rounded-full px-4 py-2 hover:bg-forest/5">
              {t("adminPanel")}
            </Link>
          )}

          {user && (
            <button onClick={logout} className="text-xs text-ink/40 hover:text-ink/70">
              {t("logout")}
            </button>
          )}
        </div>

        <button className="lg:hidden text-forest" onClick={() => setOpen(true)} aria-label="Open menu">
          <FiMenu size={26} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-forest-900/95 backdrop-blur-sm lg:hidden"
          >
            <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
              <span className="font-display text-cream text-lg">MASAIMI</span>
              <button onClick={() => setOpen(false)} className="text-cream" aria-label="Close menu">
                <FiX size={26} />
              </button>
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-6 max-w-7xl mx-auto px-6 mt-8"
            >
              {links.map((l) => (
                <NavLink key={l.label} to={l.to} onClick={() => setOpen(false)} className="text-2xl font-display text-cream/90">
                  {l.label}
                </NavLink>
              ))}
              <button onClick={toggleLang} className="text-cream/80 text-sm w-fit flex items-center gap-2">
                <FiGlobe size={16} /> {lang === "en" ? "বাংলা" : "English"}
              </button>
              {!user && (
                <Button as={Link} to="/login" onClick={() => setOpen(false)} variant="gold" className="mt-2 w-fit">
                  {t("login")}
                </Button>
              )}
              {user?.role === "admin" && (
                <Link to="/admin" onClick={() => setOpen(false)} className="text-cream text-lg">{t("adminPanel")}</Link>
              )}
              {user && (
                <button onClick={() => { logout(); setOpen(false); }} className="text-cream/60 text-sm text-left">
                  {t("logout")}
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}