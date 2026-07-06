import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

const CONFIG = {
  verified: { label: "Verified", classes: "bg-emerald/10 text-emerald border-emerald/30", icon: FiCheckCircle },
  pending: { label: "Pending Review", classes: "bg-gold/10 text-gold-dark border-gold/30", icon: FiClock },
  rejected: { label: "Rejected", classes: "bg-red-500/10 text-red-600 border-red-500/30", icon: FiXCircle },
};

export default function StatusBadge({ status = "pending" }) {
  const c = CONFIG[status] || CONFIG.pending;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${c.classes}`}>
      <Icon size={13} />
      {c.label}
    </span>
  );
}