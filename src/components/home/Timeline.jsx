import { motion } from "framer-motion";
import { timelineSteps } from "../../data/mockData";

export default function Timeline() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="max-w-xl mb-16">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dark font-medium">The process</p>
        <h2 className="font-display text-3xl md:text-4xl mt-3 text-ink">How the savings system works</h2>
      </div>

      <div className="relative">
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-forest/15 hidden sm:block" />
        <ol className="space-y-10">
          {timelineSteps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative flex gap-6"
            >
              <div className="relative z-10 shrink-0 h-10 w-10 rounded-full bg-forest text-cream font-mono text-sm flex items-center justify-center">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="pt-1">
                <h3 className="font-display text-lg text-forest">{step.title}</h3>
                <p className="mt-1 text-ink/60 text-sm max-w-md leading-relaxed">{step.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}