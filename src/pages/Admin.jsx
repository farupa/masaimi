import { useState } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiX, FiAlertTriangle } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import Seal from "../components/common/Seal";
import { pendingMembers as initialMembers, pendingReceipts as initialReceipts } from "../data/mockAdminData";

export default function Admin() {
  const { t } = useLanguage();
  const [tab, setTab] = useState("members"); // members | receipts
  const [members, setMembers] = useState(initialMembers);
  const [receipts, setReceipts] = useState(initialReceipts);

  // TODO: replace with PATCH /api/admin/members/:id { status: "approved" | "rejected" }
  const decideMember = (id, decision) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    console.log(`Member ${id} => ${decision}`);
  };

  // TODO: replace with PATCH /api/admin/receipts/:id { status: "verified" | "rejected" }
  const decideReceipt = (id, decision) => {
    setReceipts((prev) => prev.filter((r) => r.id !== id));
    console.log(`Receipt ${id} => ${decision}`);
  };

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <Seal size={48} label="ADMIN" tone="gold" spin={false} />
          <h1 className="font-display text-3xl text-forest">{t("adminTitle")}</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("members")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              tab === "members" ? "bg-forest text-cream" : "bg-forest/5 text-forest/60 hover:bg-forest/10"
            }`}
          >
            {t("tabMembers")} ({members.length})
          </button>
          <button
            onClick={() => setTab("receipts")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              tab === "receipts" ? "bg-forest text-cream" : "bg-forest/5 text-forest/60 hover:bg-forest/10"
            }`}
          >
            {t("tabReceipts")} ({receipts.length})
          </button>
        </div>

        {/* Pending Members tab */}
        {tab === "members" && (
          <div className="space-y-4">
            {members.length === 0 && (
              <p className="text-sm text-ink/40">{t("noPendingMembers")}</p>
            )}
            {members.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-display text-lg text-forest">{m.name}</h3>
                  <p className="text-sm text-ink/50 mt-1">
                    {m.phone} · NID {m.nid} · {m.bankName}
                  </p>
                  <p className="text-xs text-ink/40 font-mono mt-1">
                    {t("appliedOn")}: {m.appliedOn}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => decideMember(m.id, "approved")}
                    className="flex items-center gap-1.5 rounded-full bg-emerald/10 text-emerald px-4 py-2 text-sm font-semibold hover:bg-emerald/20"
                  >
                    <FiCheck size={16} /> {t("approve")}
                  </button>
                  <button
                    onClick={() => decideMember(m.id, "rejected")}
                    className="flex items-center gap-1.5 rounded-full bg-red-500/10 text-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500/20"
                  >
                    <FiX size={16} /> {t("reject")}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pending Receipts tab */}
        {tab === "receipts" && (
          <div className="space-y-4">
            {receipts.length === 0 && (
              <p className="text-sm text-ink/40">{t("noPendingReceipts")}</p>
            )}
            {receipts.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-display text-lg text-forest">{r.memberName}</h3>
                  <p className="text-sm text-ink/50 mt-1">
                    {r.bank} · TXN {r.transactionId} · ৳{r.amount.toLocaleString()} · {r.date}
                  </p>
                  <p
                    className={`text-xs font-semibold mt-2 inline-flex items-center gap-1.5 ${
                      r.ocrMatch ? "text-emerald" : "text-gold-dark"
                    }`}
                  >
                    {r.ocrMatch ? <FiCheck size={14} /> : <FiAlertTriangle size={14} />}
                    {r.ocrMatch ? t("ocrMatched") : t("ocrMismatch")}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => decideReceipt(r.id, "verified")}
                    className="flex items-center gap-1.5 rounded-full bg-emerald/10 text-emerald px-4 py-2 text-sm font-semibold hover:bg-emerald/20"
                  >
                    <FiCheck size={16} /> {t("approve")}
                  </button>
                  <button
                    onClick={() => decideReceipt(r.id, "rejected")}
                    className="flex items-center gap-1.5 rounded-full bg-red-500/10 text-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500/20"
                  >
                    <FiX size={16} /> {t("reject")}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}