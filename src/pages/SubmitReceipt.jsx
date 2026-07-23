import { useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud, FiAlertCircle } from "react-icons/fi";
import Button from "../components/common/Button";
import Seal from "../components/common/Seal";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function SubmitReceipt() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    bankName: "",
    branchName: "",
    transactionId: "",
    depositDate: "",
    depositAmount: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use FormData so we can send the image file
      const formData = new FormData();
      formData.append("bankName", form.bankName);
      formData.append("branchName", form.branchName);
      formData.append("transactionId", form.transactionId);
      formData.append("depositDate", form.depositDate);
      formData.append("depositAmount", form.depositAmount);
      formData.append("note", form.note);
      if (imageFile) {
        formData.append("receiptImage", imageFile);
      }

      const token = localStorage.getItem("masaimi_token");
      const res = await fetch("http://localhost:5000/api/receipts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type here — browser sets it automatically for FormData
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setImagePreview(null);
    setImageFile(null);
    setForm({ bankName: "", branchName: "", transactionId: "", depositDate: "", depositAmount: "", note: "" });
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
          <Button onClick={resetForm} variant="ghost" className="mt-6">
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
          Member: {user?.name} · {user?.bankName}
        </p>

        {error && (
          <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
            <FiAlertCircle size={16} /> {error}
          </div>
        )}

        <div className="mt-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-ink/70">{t("bankName")}</label>
              <input name="bankName" required value={form.bankName} onChange={handleChange} placeholder="Dutch-Bangla Bank" className="mt-1.5 w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:border-forest outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-ink/70">{t("branchName")}</label>
              <input name="branchName" required value={form.branchName} onChange={handleChange} placeholder="Mirpur Branch" className="mt-1.5 w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:border-forest outline-none" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-ink/70">{t("transactionId")}</label>
            <input name="transactionId" required value={form.transactionId} onChange={handleChange} placeholder="TXN-928374" className="mt-1.5 w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:border-forest outline-none" />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-ink/70">{t("depositDate")}</label>
              <input name="depositDate" type="date" required value={form.depositDate} onChange={handleChange} className="mt-1.5 w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:border-forest outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-ink/70">{t("depositAmount")}</label>
              <input name="depositAmount" type="number" required value={form.depositAmount} onChange={handleChange} placeholder="3000" className="mt-1.5 w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:border-forest outline-none" />
            </div>
          </div>

          {/* Receipt image upload */}
          <div>
            <label className="text-sm font-medium text-ink/70">{t("receiptImage")}</label>
            <label className="mt-1.5 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-forest/20 rounded-lg py-6 cursor-pointer hover:border-forest/40 transition-colors">
              {imagePreview ? (
                <img src={imagePreview} alt="Receipt preview" className="max-h-40 rounded-lg object-contain" />
              ) : (
                <>
                  <FiUploadCloud className="text-forest/50" size={28} />
                  <span className="text-xs text-ink/40">Click to upload receipt image</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {imagePreview && (
              <button type="button" onClick={() => { setImagePreview(null); setImageFile(null); }} className="text-xs text-red-400 mt-1 hover:text-red-600">
                Remove image
              </button>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-ink/70">{t("optionalNote")}</label>
            <textarea name="note" rows={3} value={form.note} onChange={handleChange} placeholder="Anything the committee should know..." className="mt-1.5 w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:border-forest outline-none" />
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full mt-8" disabled={loading}>
          {loading ? "Submitting..." : t("submitButton")}
        </Button>
      </motion.form>
    </div>
  );
}