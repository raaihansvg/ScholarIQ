export default function Footer() {
  return (
    <footer className="border-t border-white/[0.018] bg-[#111112] px-6 py-12 text-zinc-700 sm:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 text-[0.6rem] font-bold uppercase tracking-[0.075em] sm:flex-row sm:items-center sm:justify-between">
        <p className="normal-case tracking-[-0.015em] text-zinc-500">ScholarIQ</p>
        <p className="text-right text-zinc-700">
          © 2026 ScholarIQ. Precision-engineered for academic excellence.
        </p>
      </div>
    </footer>
  );
}
