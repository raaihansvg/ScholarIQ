export default function NumberField({
  label,
  value,
  min,
  max,
  step = 0.01,
  unitSuffix = "",
  placeholder,
  helperText,
  softWarning,
  error,
  onChange,
}) {
  return (
    <div className={`w-full rounded-[20px] border border-white/[0.07] bg-white/[0.035] p-5 transition-colors duration-200 hover:border-white/[0.11] ${error ? "animate-shake border-red-400/40" : ""}`}>
      <label className="mb-3 block text-sm font-semibold tracking-[-0.015em] text-zinc-300">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value === "" ? "" : parseFloat(e.target.value))}
          className={`w-full rounded-2xl border bg-[#0F0F10] px-4 py-3.5 font-mono text-base font-semibold text-zinc-100 outline-none transition-all duration-200 placeholder:text-zinc-700 focus:border-white/[0.18] focus:bg-[#121214] ${
            error ? "border-red-400/70" : "border-white/[0.08]"
          }`}
        />
        {unitSuffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
            {unitSuffix}
          </span>
        )}
      </div>
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
