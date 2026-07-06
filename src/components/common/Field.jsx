export default function Field({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink/70">{label}</label>
      <input
        {...props}
        className="mt-1.5 w-full rounded-lg border border-forest/15 bg-cream/40 px-4 py-3 text-sm focus:border-forest outline-none"
      />
    </div>
  );
}