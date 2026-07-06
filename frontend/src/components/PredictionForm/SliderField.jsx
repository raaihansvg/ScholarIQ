import { motion, AnimatePresence } from "framer-motion";

export default function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  unitSuffix = "",
  endLabels,
  helperText,
  softWarning,
  error,
  onChange,
}) {
  const ratio = ((Number(value) - min) / (max - min)) * 100;
  const fillPercent = Math.min(100, Math.max(0, ratio));

  return (
    <div className={`w-full rounded-[20px] border border-white/[0.07] bg-white/[0.035] p-5 transition-colors duration-200 hover:border-white/[0.11] ${error ? "animate-shake border-red-400/40" : ""}`}>
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <label className="text-sm font-semibold tracking-[-0.015em] text-zinc-300">
          {label}
        </label>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={Math.round(value * 100)}
            initial={{ opacity: 0, y: -4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="rounded-full border border-white/[0.08] bg-white/[0.055] px-3 py-1 font-mono text-xs font-semibold text-zinc-200"
          >
            {value}
            {unitSuffix}
          </motion.span>
        </AnimatePresence>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          background: `linear-gradient(90deg, #F2F1EE 0%, #F2F1EE ${fillPercent}%, rgba(255,255,255,0.08) ${fillPercent}%, rgba(255,255,255,0.08) 100%)`,
        }}
        className="premium-range h-1.5 w-full cursor-pointer appearance-none rounded-full"
      />

      {endLabels && (
        <div className="mt-3 flex justify-between text-xs text-zinc-600">
          <span>{endLabels[0]}</span>
          <span>{endLabels[1]}</span>
        </div>
      )}

      {helperText && !softWarning && (
        <p className="mt-3 text-xs leading-5 text-zinc-600">{helperText}</p>
      )}
      {softWarning && (
        <p className="mt-3 text-xs leading-5 text-amber-300/80">{softWarning}</p>
      )}
      {error && <p className="mt-3 text-xs font-medium text-red-300">{error}</p>}
    </div>
  );
}
