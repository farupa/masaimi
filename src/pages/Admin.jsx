import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiImage } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import Seal from "../components/common/Seal";
import API from "../api";

export default function Admin() {
  const { t } = useLanguage();
  const [tab, setTab] = useState("members");
  const [members, setMembers] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewImage, setViewImage] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [membersRes, receiptsRes] = await Promise.all([
        API.get("/admin/members"),
        API.get("/admin/receipts"),
      ]);
      setMembers(membersRes.data.filter((m) => m.status === "pending"));
      setReceipts(receiptsRes.data.filter((r) => r.status === "pending"));
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setLoading(false);
    }
  };

  const decideMember = async (id, status) => {
    try {
      await API.patch(`/admin/members/${id}`, { status });
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const decideReceipt = async (id, status) => {
    try {
      await API.patch(`/admin/receipts/${id}`, { status });
      setReceipts((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <Seal size={48} label="ADMIN" tone="gold" spin={false} />
          <h1 className="font-display text-3xl text-forest">{t("adminTitle")}</h1>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab("members")} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${tab === "members" ? "bg-forest text-cream" : "bg-forest/5 text-forest/60 hover:bg-forest/10"}`}>
            {t("tabMembers")} ({members.length})
          </button>
          <button onClick={() => setTab("receipts")} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${tab === "receipts" ? "bg-forest text-cream" : "bg-forest/5 text-forest/60 hover:bg-forest/10"}`}>
            {t("tabReceipts")} ({receipts.length})
          </button>
        </div>

        {loading && <p className="text-ink/40 text-sm">Loading...</p>}

        {/* Pending Members */}
        {!loading && tab === "members" && (
          <div className="space-y-4">
            {members.length === 0 && <p className="text-sm text-ink/40">{t("noPendingMembers")}</p>}
            {members.map((m) => (
              <motion.div key={m._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg text-forest">{m.name}</h3>
                  <p className="text-sm text-ink/50 mt-1">📞 {m.phone} · 🏦 {m.bankName || "—"}</p>
                  <p className="text-xs text-ink/40 font-mono mt-1">{t("appliedOn")}: {new Date(m.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => decideMember(m._id, "approved")} className="flex items-center gap-1.5 rounded-full bg-emerald/10 text-emerald px-4 py-2 text-sm font-semibold hover:bg-emerald/20">
                    <FiCheck size={16} /> {t("approve")}
                  </button>
                  <button onClick={() => decideMember(m._id, "rejected")} className="flex items-center gap-1.5 rounded-full bg-red-500/10 text-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500/20">
                    <FiX size={16} /> {t("reject")}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pending Receipts */}
        {!loading && tab === "receipts" && (
          <div className="space-y-4">
            {receipts.length === 0 && <p className="text-sm text-ink/40">{t("noPendingReceipts")}</p>}
            {receipts.map((r) => (
              <motion.div key={r._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-display text-lg text-forest">{r.memberName}</h3>
                    <p className="text-sm text-ink/50 mt-1">🏦 {r.bankName} · {r.branchName}</p>
                    <p className="text-sm text-ink/50">TXN: {r.transactionId} · ৳{r.depositAmount} · {r.depositDate}</p>
                    {r.note && <p className="text-xs text-ink/40 mt-1 italic">Note: {r.note}</p>}
                    <p className="text-xs text-ink/30 font-mono mt-1">Submitted: {new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>

                  {/* Receipt image thumbnail */}
                  {r.receiptImage ? (
                    <button onClick={() => setViewImage(`http://localhost:5000${r.receiptImage}`)} className="shrink-0 group">
                      <img
                        src={`http://localhost:5000${r.receiptImage}`}
                        alt="Receipt"
                        className="h-20 w-20 object-cover rounded-lg border border-forest/10 group-hover:opacity-80 transition-opacity"
                      />
                      <p className="text-xs text-forest mt-1 text-center">View</p>
                    </button>
                  ) : (
                    <div className="h-20 w-20 rounded-lg border border-dashed border-forest/20 flex items-center justify-center shrink-0">
                      <FiImage className="text-ink/20" size={24} />
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button onClick={() => decideReceipt(r._id, "verified")} className="flex items-center gap-1.5 rounded-full bg-emerald/10 text-emerald px-4 py-2 text-sm font-semibold hover:bg-emerald/20">
                    <FiCheck size={16} /> {t("approve")}
                  </button>
                  <button onClick={() => decideReceipt(r._id, "rejected")} className="flex items-center gap-1.5 rounded-full bg-red-500/10 text-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500/20">
                    <FiX size={16} /> {t("reject")}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
              <img src={viewImage} alt="Receipt full size" className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl" />
              <p className="text-center text-cream/60 text-sm mt-3">Click anywhere to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}