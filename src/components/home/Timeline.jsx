import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function Timeline() {
  const { t } = useLanguage();

  const steps = [
    { titleKey: "step1Title", textKey: "step1Text" },
    { titleKey: "step2Title", textKey: "step2Text" },
    { titleKey: "step3Title", textKey: "step3Text" },
    { titleKey: "step4Title", textKey: "step4Text" },
    { titleKey: "step5Title", textKey: "step5Text" },
    { titleKey: "step6Title", textKey: "step6Text" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="max-w-xl mb-16">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold-dark font-medium">
          {t("processEyebrow")}
        </p>
        <h2 className="font-display text-3xl md:text-4xl mt-3 text-ink">
          {t("processTitle")}
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-forest/15 hidden sm:block" />
        <ol className="space-y-10">
          {steps.map((step, i) => (
            <motion.li
              key={i}
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
                <h3 className="font-display text-lg text-forest">{t(step.titleKey)}</h3>
                <p className="mt-1 text-ink/60 text-sm max-w-md leading-relaxed">{t(step.textKey)}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}