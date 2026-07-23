import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiPhone, FiAlertCircle } from "react-icons/fi";
import Button from "../components/common/Button";
import Seal from "../components/common/Seal";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(phone, password);
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
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

        {error && (
          <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
            <FiAlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-ink/70">{t("phone")}</label>
            <div className="relative mt-1.5">
              <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30" />
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
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

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-8"
          disabled={loading}
        >
          {loading ? "Signing in..." : t("signIn")}
        </Button>

        <p className="text-center text-sm text-ink/50 mt-6">
          {t("noAccount")}{" "}
          <Link to="/register" className="text-forest font-semibold">{t("registerHere")}</Link>
        </p>
      </motion.form>
    </div>
  );
}