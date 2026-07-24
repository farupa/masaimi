import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FiSearch } from "react-icons/fi";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/api/admin/members/public`)
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
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

        {loading && <p className="text-sm text-ink/40">Loading members...</p>}

        {!loading && (
          <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-ink/40 border-b border-forest/10">
                  <th className="p-4 font-medium">Photo</th>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium">Bank</th>
                  <th className="p-4 font-medium">Total Deposited</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m._id} className="border-b border-forest/5 last:border-0 hover:bg-sage/40">
                    <td className="p-4">
                      <div className="h-10 w-10 rounded-full bg-forest/10 text-forest flex items-center justify-center font-display text-sm font-semibold">
                        {m.name.charAt(0)}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-ink/80">{m.name}</td>
                    <td className="p-4 text-ink/60 font-mono text-xs">{m.phone}</td>
                    <td className="p-4 text-ink/60">{m.bankName || "—"}</td>
                    <td className="p-4 font-mono text-emerald font-semibold">
                      {m.totalDeposited > 0 ? `৳${m.totalDeposited.toLocaleString()}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="text-center text-ink/40 py-10">No members found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}