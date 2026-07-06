import { useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";
import Button from "../components/common/Button";
import Field from "../components/common/Field";
import Seal from "../components/common/Seal";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function SubmitReceipt() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST multipart form data (with receipt image) to /api/payments
    // Fields to send: memberId, bankName, branchName, accountNumber,
    // transactionId, depositDate, depositAmount, note, receiptImage
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
          <p className="text-ink/70 leading-relaxed">{t("receiptSubmitted")}</p>
          <Button onClick={() => setSubmitted(false)} variant="ghost" className="mt-6">
            Submit another
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
        <h1 className="font-display text-2xl text-forest">{t("submitReceiptTitle")}</h1>
        <p className="text-sm text-ink/50 mt-1">{t("submitReceiptSubtitle")}</p>
        <p className="text-xs text-ink/40 mt-2 font-mono">
          Member: {user?.name} · {user?.bank}
        </p>

        <div className="mt-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label={t("branchName")} required placeholder="Mirpur Branch" />
            <Field label={t("accountNumber")} required placeholder="0123456789" />
          </div>
          <Field label={t("transactionId")} required placeholder="TXN-928374" />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label={t("depositDate")} type="date" required />
            <Field label={t("depositAmount")} type="number" required placeholder="3000" />
          </div>

          <div>
            <label className="text-sm font-medium text-ink/70">{t("receiptImage")}</label>
            <label className="mt-1.5 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-forest/20 rounded-lg py-8 cursor-pointer hover:border-forest/40 transition-colors">
              <FiUploadCloud className="text-forest/50" size={28} />
              <span className="text-xs text-ink/40">Click to upload receipt image</span>
              <input type="file" accept="image/*" required className="hidden" />
            </label>
          </div>

          <div>
            <label className="text-sm font-medium text-ink/70">{t("optionalNote")}</label>
            <textarea
              rows={3}
              placeholder="Anything the committee should know..."
              className="mt-1.5 w-full rounded-lg border border-forest/15 bg-cream/40 px-4 py-3 text-sm focus:border-forest outline-none"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full mt-8">
          {t("submitButton")}
        </Button>
      </motion.form>
    </div>
  );
}