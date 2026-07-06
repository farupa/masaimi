import { motion } from "framer-motion";
import { FiShield, FiTrendingUp, FiUsers, FiFileText } from "react-icons/fi";

const BENEFITS = [
  { icon: FiShield, title: "Verified deposits", text: "Every receipt is OCR-scanned and checked against your submission before it's approved." },
  { icon: FiTrendingUp, title: "Visible growth", text: "Track your total savings, payment streak, and progress on a live dashboard." },
  { icon: FiUsers, title: "Member-owned", text: "Run by an elected committee, accountable to the members who fund it." },
  { icon: FiFileText, title: "Full paper trail", text: "Download or print a formal receipt for every verified monthly deposit." },
];

export default function WhyJoin() {
  return (
    <section className="bg-sage py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dark font-medium">Why join</p>
          <h2 className="font-display text-3xl md:text-4xl mt-3 text-ink">Savings, run like a real institution</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl bg-white p-7 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="h-11 w-11 rounded-full bg-forest/5 flex items-center justify-center">
                <b.icon className="text-forest" size={20} />
              </div>
              <h3 className="font-display text-lg text-forest mt-5">{b.title}</h3>
              <p className="mt-2 text-sm text-ink/60 leading-relaxed">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}