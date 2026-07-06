import { motion } from "framer-motion";
import { FiTarget, FiEye } from "react-icons/fi";

const CARDS = [
  {
    icon: FiTarget,
    label: "Our Mission",
    text: "বাংলাদেশের কর্মজীবী পরিবারগুলোকে একটি স্বচ্ছ, সদস্য-পরিচালিত সঞ্চয় সমিতির মাধ্যমে নিয়মিত, নির্ভরযোগ্য এবং যাচাইযোগ্য সঞ্চয় গড়ে তুলতে সহায়তা করা—যেখানে অনানুষ্ঠানিক হিসাব-নিকাশ বা পাসবুক হারিয়ে যাওয়ার ঝুঁকি থাকবে না।",
  },
  {
    icon: FiEye,
    label: "Our Vision",
    text: "এমন একটি সমাজ গড়ে তোলা, যেখানে প্রতিটি পরিবার নিয়মিত, নিরাপদ ও বিশ্বাসযোগ্য সঞ্চয় ব্যবস্থার সুবিধা পাবে এবং প্রতিটি যাচাইকৃত জমার মাধ্যমে তাদের আর্থিক মর্যাদা ও ভবিষ্যৎ আরও শক্তিশালী হবে।",
  },
];

export default function MissionVision() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-8">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-2xl border border-forest/10 bg-white p-9 shadow-md"
          >
            <c.icon className="text-gold" size={28} />
            <h3 className="font-display text-2xl text-forest mt-5">{c.label}</h3>
            <p className="mt-4 text-ink/65 leading-relaxed">{c.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}