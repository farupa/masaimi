import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/common/Button";
import Seal from "../components/common/Seal";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { FiAlertCircle } from "react-icons/fi";

export default function Register() {
  const { t } = useLanguage();
  const { register } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    bankName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await register({
        name: form.name,
        phone: form.phone,
        bankName: form.bankName,
        password: form.password,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-sage flex items-center justify-center py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md bg-white rounded-2xl shadow-xl p-9"
        >
          <div className="flex justify-center mb-6">
            <Seal size={64} label="PENDING" tone="gold" />
          </div>
          <h1 className="font-display text-2xl text-forest">{t("registerTitle")}</h1>
          <p className="text-ink/60 mt-3 leading-relaxed">{t("pendingNotice")}</p>
          <Button as={Link} to="/login" variant="ghost" className="mt-6">
            {t("loginHere")}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-sage flex items-center justify-center py-16 px-4">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-9"
      >
        <div className="flex justify-center mb-6">
          <Seal size={56} label="MSM" tone="forest" spin={false} />
        </div>
        <h1 className="font-display text-2xl text-center text-forest">{t("registerTitle")}</h1>
        <p className="text-center text-sm text-ink/50 mt-1">{t("registerSubtitle")}</p>

        {error && (
          <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
            <FiAlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-ink/70">{t("fullName")}</label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="mt-1.5 w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:border-forest outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink/70">{t("phone")}</label>
            <input
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className="mt-1.5 w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:border-forest outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink/70">{t("bankName")}</label>
            <input
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
              placeholder="Dutch-Bangla Bank"
              className="mt-1.5 w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:border-forest outline-none"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-ink/70">{t("passwordLabel")}</label>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:border-forest outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ink/70">{t("confirmPassword")}</label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:border-forest outline-none"
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
          {loading ? "Submitting..." : t("submitRegistration")}
        </Button>

        <p className="text-center text-sm text-ink/50 mt-6">
          {t("alreadyMember")}{" "}
          <Link to="/login" className="text-forest font-semibold">{t("loginHere")}</Link>
        </p>
      </motion.form>
    </div>
  );
}