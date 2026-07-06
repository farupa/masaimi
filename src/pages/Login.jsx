import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiCreditCard } from "react-icons/fi";
import Button from "../components/common/Button";
import Field from "../components/common/Field";
import Seal from "../components/common/Seal";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Login() {
  const [nid, setNid] = useState("");
  const [password, setPassword] = useState("");
  const { loginAsMember, loginAsAdmin } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST { nid, password } to /api/auth/login, store JWT
    loginAsMember();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-sage flex items-center justify-center py-16 px-4">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-9"
      >
        <div className="flex justify-center mb-6">
          <Seal size={56} label="MSM" tone="forest" spin={false} />
        </div>
        <h1 className="font-display text-2xl text-center text-forest">{t("loginTitle")}</h1>
        <p className="text-center text-sm text-ink/50 mt-1">{t("loginSubtitle")}</p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-ink/70">{t("nidLabel")}</label>
            <div className="relative mt-1.5">
              <FiCreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30" />
              <input
                required
                value={nid}
                onChange={(e) => setNid(e.target.value)}
                placeholder="1990-XXXX-XXXX"
                className="w-full rounded-lg border border-forest/15 pl-10 pr-4 py-3 text-sm focus:border-forest outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-ink/70">{t("passwordLabel")}</label>
            <div className="relative mt-1.5">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-forest/15 pl-10 pr-4 py-3 text-sm focus:border-forest outline-none"
              />
            </div>
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full mt-8">
          {t("signIn")}
        </Button>

        {/* Demo-only buttons so you can test both roles without a backend */}
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => { loginAsMember(); navigate("/dashboard"); }}
            className="text-xs text-ink/40 hover:text-forest underline"
          >
            {t("loginAsMember")}
          </button>
          <button
            type="button"
            onClick={() => { loginAsAdmin(); navigate("/admin"); }}
            className="text-xs text-ink/40 hover:text-forest underline"
          >
            {t("loginAsAdmin")}
          </button>
        </div>

        <p className="text-center text-sm text-ink/50 mt-6">
          {t("noAccount")}{" "}
          <Link to="/register" className="text-forest font-semibold">{t("registerHere")}</Link>
        </p>
      </motion.form>
    </div>
  );
}