import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function MissionVision() {
  const { lang } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="text-center mb-12">
        <h2 className={`font-display text-3xl md:text-4xl text-forest ${lang === "bn" ? "font-bengali" : ""}`}>
          {lang === "bn" ? "মাসাইমি ভিশন ও মিশন (২০২৬–২০৩১)" : "MASAIMI Vision & Mission (2026–2031)"}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-forest/10 bg-white p-9 shadow-md"
        >
          <h3 className={`text-2xl text-forest mb-4 ${lang === "bn" ? "font-bengali font-semibold" : "font-display"}`}>
            {lang === "bn" ? "ভিশন" : "Vision"}
          </h3>
          <p className={`text-ink/70 leading-relaxed ${lang === "bn" ? "font-bengali text-base" : "text-sm"}`}>
            {lang === "bn"
              ? "সদস্যদের সঞ্চয়, ঐক্য এবং পারস্পরিক সহযোগিতার মাধ্যমে একটি শক্তিশালী, স্বনির্ভর ও বিশ্বাসযোগ্য আর্থিক সংগঠন গড়ে তোলা, যা ২০৩১ সালের মধ্যে একটি সফল ও টেকসই কোম্পানিতে রূপান্তরিত হয়ে কর্মসংস্থান সৃষ্টি, বিনিয়োগ বৃদ্ধি এবং সদস্যদের আর্থিক সমৃদ্ধিতে গুরুত্বপূর্ণ ভূমিকা রাখবে।"
              : "To build a strong, self-reliant and trustworthy financial organization through members' savings, unity and mutual cooperation, which will be transformed into a successful and sustainable company by 2031, playing an important role in creating employment, increasing investment and ensuring members' financial prosperity."}
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-forest/10 bg-white p-9 shadow-md"
        >
          <h3 className={`text-2xl text-forest mb-4 ${lang === "bn" ? "font-bengali font-semibold" : "font-display"}`}>
            {lang === "bn" ? "মিশন" : "Mission"}
          </h3>
          <ul className={`space-y-2 text-ink/70 ${lang === "bn" ? "font-bengali text-base" : "text-sm"}`}>
            {lang === "bn" ? (
              <>
                <li>• সদস্যদের মধ্যে নিয়মিত সঞ্চয়ের অভ্যাস গড়ে তোলা।</li>
                <li>• স্বচ্ছতা, জবাবদিহিতা এবং সুশাসনের মাধ্যমে সমিতির কার্যক্রম পরিচালনা করা।</li>
                <li>• সংগৃহীত সঞ্চয়কে পরিকল্পিত ও নিরাপদ বিনিয়োগের মাধ্যমে মূলধনে পরিণত করা।</li>
                <li>• ২০৩১ সালের মধ্যে আইনগত কাঠামো অনুসরণ করে একটি লাভজনক ও টেকসই কোম্পানি প্রতিষ্ঠা করা।</li>
                <li>• সদস্যদের দক্ষতা উন্নয়ন, উদ্যোক্তা তৈরি এবং কর্মসংস্থানের সুযোগ সৃষ্টি করা।</li>
                <li>• সদস্যদের আর্থিক নিরাপত্তা ও সামাজিক উন্নয়নে দীর্ঘমেয়াদি অবদান রাখা।</li>
              </>
            ) : (
              <>
                <li>• Build regular savings habits among members.</li>
                <li>• Operate the society through transparency, accountability and good governance.</li>
                <li>• Convert collected savings into capital through planned and safe investment.</li>
                <li>• Establish a profitable and sustainable company by 2031 following legal framework.</li>
                <li>• Develop members' skills, create entrepreneurs and generate employment opportunities.</li>
                <li>• Make long-term contributions to members' financial security and social development.</li>
              </>
            )}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}