const GAYA_VARIAN = {
  primary:
    "border border-white/80 bg-[#F2F1EE] text-zinc-950 shadow-none hover:bg-white hover:shadow-[0_0_22px_rgba(255,255,255,0.08)]",
  secondary:
    "border border-white/[0.08] bg-white/[0.045] text-zinc-300 hover:border-white/[0.14] hover:bg-white/[0.075] hover:text-zinc-100",
  ghost:
    "border border-transparent bg-transparent text-zinc-500 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-zinc-200",
};

export default function AnimatedButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  icon: Ikon,
  iconPosition = "right",
}) {
  const kelasUtama = GAYA_VARIAN[variant] || GAYA_VARIAN.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-[3.15rem] items-center justify-center gap-2 rounded-full px-7 text-[0.82rem] font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-35 hover:scale-[1.015] active:scale-[0.985] ${kelasUtama} ${className}`}
    >
      {Ikon && iconPosition === "left" && <Ikon size={18} />}
      {children}
      {Ikon && iconPosition === "right" && <Ikon size={18} />}
    </button>
  );
}
