import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/common/Button";
import Field from "../components/common/Field";
import Seal from "../components/common/Seal";
import { useLanguage } from "../context/LanguageContext";

export default function Register() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST form data to /api/auth/register (multipart, with profile photo)
    setSubmitted(true);
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

        <div className="mt-8 space-y-5">
          <Field label={t("fullName")} required placeholder="Rafiqul Islam" />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label={t("phone")} required placeholder="01XXXXXXXXX" />
            <Field label={t("nidNumber")} required placeholder="1990-XXXX-XXXX" />
          </div>
          <Field label={t("bankName")} required placeholder="Dutch-Bangla Bank" />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label={t("passwordLabel")} type="password" required placeholder="••••••••" />
            <Field label={t("confirmPassword")} type="password" required placeholder="••••••••" />
          </div>
          <div>
            <label className="text-sm font-medium text-ink/70">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="mt-1.5 w-full text-sm text-ink/60 file:mr-4 file:rounded-lg file:border-0 file:bg-forest/10 file:text-forest file:px-4 file:py-2"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full mt-8">
          {t("submitRegistration")}
        </Button>

        <p className="text-center text-sm text-ink/50 mt-6">
          {t("alreadyMember")}{" "}
          <Link to="/login" className="text-forest font-semibold">{t("loginHere")}</Link>
        </p>
      </motion.form>
    </div>
  );
}