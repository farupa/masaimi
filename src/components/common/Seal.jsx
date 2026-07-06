import { motion } from "framer-motion";

export default function Seal({
  label = "VERIFIED",
  sublabel = "MASAIMI",
  size = 96,
  tone = "gold", // gold | forest
  spin = true,
}) {
  const ring = tone === "gold" ? "#B8872E" : "#0E3B2E";
  const fill = tone === "gold" ? "#FDF6E8" : "#EAF1EE";

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <motion.svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        animate={spin ? { rotate: 360 } : {}}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke={ring} strokeWidth="1.5" strokeDasharray="2 3" />
        <path id={`sealtext-${label}`} fill="none" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
        <text fontSize="7.2" letterSpacing="2" fill={ring} fontFamily="'IBM Plex Mono', monospace" fontWeight="600">
          <textPath href={`#sealtext-${label}`} startOffset="2%">
            {sublabel} • {sublabel} • {sublabel} •
          </textPath>
        </text>
      </motion.svg>
      <div
        className="absolute inset-[18%] rounded-full flex flex-col items-center justify-center border"
        style={{ backgroundColor: fill, borderColor: ring }}
      >
        <span className="font-display font-semibold leading-none text-center px-1" style={{ color: ring, fontSize: size * 0.13 }}>
          {label}
        </span>
      </div>
    </div>
  );
}