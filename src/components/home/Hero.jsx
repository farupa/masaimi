import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Button from "../common/Button";
import Seal from "../common/Seal";
import StatCard from "../common/StatCard";
import { useLanguage } from "../../context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-forest-900">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-emerald/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs tracking-[0.2em] uppercase text-gold-light font-medium mb-6"
            >
              Est. 2026  · Dhaka, Bangladesh
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.08] text-cream"
            >
              {lang === "bn" ? (
                <span className="block font-bengali leading-tight text-cream/95">
                  সঞ্চয়ে শৃঙ্খলা, <span className="italic text-gold-light">আত্মবিশ্বাসে</span> অগ্রযাত্রা।
                </span>
              ) : (
                <span className="block leading-tight text-cream/95">
                  Discipline in saving, confidence in every step.
                </span>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-lg text-cream/65 text-lg leading-relaxed"
            >
              MASAIMI একটি সদস্য-মালিকানাধীন সঞ্চয় সমিতি, যেখানে প্রতিটি সদস্যের মাসিক জমা স্বচ্ছভাবে সংরক্ষণ, যাচাই এবং ট্র্যাক করা হয়। এটি একটি ডিজিটাল পাসবুকের মতো, যা কখনো হারিয়ে যায় না এবং আপনার সকল লেনদেনের নির্ভরযোগ্য রেকর্ড সংরক্ষণ করে।

            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Button as={Link} to="/register" variant="gold">
                Become a member <FiArrowRight />
              </Button>
              <Button as={Link} to="/members" variant="outlineLight">
                View member directory
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-16 border-t border-cream/10 pt-8"
            >
              <StatCard value={20} label="Total Members" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto hidden lg:block"
          >
            <div className="relative w-[340px] rounded-2xl bg-sage p-7 shadow-xl rotate-3">
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-forest text-lg">Passbook</span>
                <Seal size={56} label="PAID" tone="gold" />
              </div>
              <div className="space-y-4 font-mono text-sm text-ink/70">
                {[
                  ["Jan 2026", "৳3,000", true],
                  ["Feb 2026", "৳3,000", true],
                  ["Mar 2026", "৳3,000", true],
                  ["Apr 2026", "৳3,000", true],
                  ["May 2026", "৳3,000", false],
                ].map(([m, amt, done]) => (
                  <div key={m} className="flex items-center justify-between border-b border-ink/10 pb-2">
                    <span>{m}</span>
                    <span className={done ? "text-emerald" : "text-gold-dark"}>{amt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-[340px] rounded-2xl bg-forest-600 h-full -z-10 -rotate-2" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}