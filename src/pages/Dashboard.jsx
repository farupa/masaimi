import { motion } from "framer-motion";
import { FiImage } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import Seal from "../components/common/Seal";
import StatusBadge from "../components/common/StatusBadge";
import { myReceipts } from "../data/mockReceipts";

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const totalPaid = myReceipts
    .filter((r) => r.status === "verified")
    .reduce((sum, r) => sum + r.amount, 0);
  const pendingAmount = myReceipts
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="bg-sage min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        {/* Profile / welcome card */}
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
              <p className="text-cream/60 text-sm mt-1">
                NID {user?.nid} · {user?.bank}
              </p>
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

          {myReceipts.length === 0 ? (
            <p className="text-sm text-ink/40">{t("noReceipts")}</p>
          ) : (
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-ink/40 border-b border-forest/10">
                  <th className="pb-3 font-medium">Month</th>
                  <th className="pb-3 font-medium">Transaction ID</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {myReceipts.map((r) => (
                  <tr key={r.id} className="border-b border-forest/5 last:border-0">
                    <td className="py-3.5">{r.month}</td>
                    <td className="py-3.5 font-mono text-xs text-ink/60">{r.transactionId}</td>
                    <td className="py-3.5 font-mono text-xs text-ink/60">{r.date}</td>
                    <td className="py-3.5 font-mono">৳{r.amount.toLocaleString()}</td>
                    <td className="py-3.5"><StatusBadge status={r.status} /></td>
                    <td className="py-3.5 text-right">
                      <button className="text-forest hover:text-gold transition-colors inline-flex items-center gap-1 text-xs font-medium">
                        <FiImage size={14} /> {t("viewReceipt")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}