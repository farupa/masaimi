import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiImage } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import Seal from "../components/common/Seal";
import StatusBadge from "../components/common/StatusBadge";
import API from "../api";

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewImage, setViewImage] = useState(null);

  useEffect(() => {
    API.get("/receipts/me")
      .then((res) => setReceipts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const totalPaid = receipts
    .filter((r) => r.status === "verified")
    .reduce((sum, r) => sum + r.depositAmount, 0);

  const pendingAmount = receipts
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.depositAmount, 0);

  return (
    <div className="bg-sage min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        {/* Welcome card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-forest-900 text-cream p-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-2xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center font-display text-3xl shrink-0">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold-light">{t("accountTitle")}</p>
              <h2 className="font-display text-2xl mt-1">{user?.name}</h2>
              <p className="text-cream/60 text-sm mt-1">📞 {user?.phone} · 🏦 {user?.bankName || "—"}</p>
            </div>
            <Seal size={64} label="MSM" spin={false} />
          </div>

          <div className="relative grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-cream/10">
            <div>
              <div className="font-mono text-2xl">৳{totalPaid.toLocaleString()}</div>
              <div className="text-xs uppercase tracking-wider text-cream/50 mt-1">{t("totalPaid")}</div>
            </div>
            <div>
              <div className="font-mono text-2xl text-gold-light">৳{pendingAmount.toLocaleString()}</div>
              <div className="text-xs uppercase tracking-wider text-cream/50 mt-1">{t("pendingAmount")}</div>
            </div>
          </div>
        </motion.div>

        {/* Receipt history */}
        <div className="rounded-2xl bg-white border border-forest/10 p-6 shadow-md overflow-x-auto">
          <h3 className="font-display text-lg text-forest mb-5">{t("receiptHistoryTitle")}</h3>

          {loading && <p className="text-sm text-ink/40">Loading...</p>}

          {!loading && receipts.length === 0 && (
            <p className="text-sm text-ink/40">{t("noReceipts")}</p>
          )}

          {!loading && receipts.length > 0 && (
            <div className="space-y-4">
              {receipts.map((r) => (
                <div key={r._id} className="border border-forest/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Receipt image thumbnail */}
                  <div className="shrink-0">
                    {r.receiptImage ? (
                      <button onClick={() => setViewImage(`http://localhost:5000${r.receiptImage}`)}>
                        <img
                          src={`http://localhost:5000${r.receiptImage}`}
                          alt="Receipt"
                          className="h-16 w-16 object-cover rounded-lg border border-forest/10 hover:opacity-80 transition-opacity"
                        />
                      </button>
                    ) : (
                      <div className="h-16 w-16 rounded-lg border border-dashed border-forest/20 flex items-center justify-center">
                        <FiImage className="text-ink/20" size={20} />
                      </div>
                    )}
                  </div>

                  {/* Receipt details */}
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                    <div>
                      <div className="text-xs text-ink/40 uppercase">Bank</div>
                      <div className="text-ink/80 font-medium">{r.bankName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-ink/40 uppercase">TXN ID</div>
                      <div className="font-mono text-xs text-ink/60">{r.transactionId}</div>
                    </div>
                    <div>
                      <div className="text-xs text-ink/40 uppercase">Amount</div>
                      <div className="font-mono text-ink/80">৳{r.depositAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-ink/40 uppercase">Date</div>
                      <div className="font-mono text-xs text-ink/60">{r.depositDate}</div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <StatusBadge status={r.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Full-size image modal */}
      <AnimatePresence>
        {viewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewImage(null)}
            className="fixed inset-0 z-[70] bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <img src={viewImage} alt="Receipt full" className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl" />
              <p className="text-center text-cream/60 text-sm mt-3">Click anywhere to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}