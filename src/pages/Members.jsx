import { useState } from "react";
import { mockMembers } from "../data/mockMembers";
import { useLanguage } from "../context/LanguageContext";
import { FiSearch } from "react-icons/fi";

export default function Members() {
  const [query, setQuery] = useState("");
  const { t } = useLanguage();

  const filtered = mockMembers.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dark font-medium">
            Public directory
          </p>
          <h1 className="font-display text-3xl text-forest mt-2">{t("members")}</h1>
        </div>

        <div className="relative max-w-sm mb-6">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name"
            className="w-full rounded-full border border-forest/15 pl-10 pr-4 py-2.5 text-sm focus:border-forest outline-none bg-white"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-ink/40 border-b border-forest/10">
                <th className="p-4 font-medium">Photo</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Bank</th>
                <th className="p-4 font-medium">Last Deposit Date</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-forest/5 last:border-0 hover:bg-sage/40">
                  <td className="p-4">
                    <div className="h-10 w-10 rounded-full bg-forest/10 text-forest flex items-center justify-center font-display">
                      {m.name.charAt(0)}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-ink/80">{m.name}</td>
                  <td className="p-4 text-ink/60">{m.bankName}</td>
                  <td className="p-4 font-mono text-xs text-ink/60">{m.lastDepositDate}</td>
                  <td className="p-4 font-mono">৳{m.lastDepositAmount.toLocaleString()}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        m.status === "approved"
                          ? "bg-emerald/10 text-emerald"
                          : "bg-gold/10 text-gold-dark"
                      }`}
                    >
                      {m.status === "approved" ? "Paid Up" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-ink/40 mt-10">No members match your search.</p>
        )}
      </div>
    </div>
  );
}