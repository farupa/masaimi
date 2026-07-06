import { useCountUp } from "../../hooks/useCountUp";

export default function StatCard({ value, label, prefix = "", suffix = "" }) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="font-mono text-3xl sm:text-4xl font-semibold text-cream tabular-nums">
        {prefix}{animated.toLocaleString("en-US")}{suffix}
      </div>
      <div className="mt-1 text-xs sm:text-sm uppercase tracking-[0.15em] text-cream/60">{label}</div>
    </div>
  );
}