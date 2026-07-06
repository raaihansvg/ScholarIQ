import { motion } from "framer-motion";
import { RotateCcw, AlertTriangle, ShieldAlert } from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";
import GpaGauge from "./ui/GpaGauge";
import { useCountUp } from "../hooks/useCountUp";

export default function ResultPage({ result, onRestart }) {
  const { predicted_gpa, range_low, range_high, warnings = [] } = result;
  const animatedGpa = useCountUp(predicted_gpa, 1.3, 2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative min-h-screen overflow-x-hidden bg-[#0F0F10] px-6 pt-10 pb-24 text-zinc-200 sm:px-8 sm:pt-14 sm:pb-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.055),rgba(255,255,255,0.018)_34%,rgba(255,255,255,0)_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.012),rgba(255,255,255,0)_28%,rgba(0,0,0,0.12)_100%)]" />
      <div className="pointer-events-none absolute left-[10%] top-[12%] h-[240px] w-[240px] animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.035),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute right-[8%] top-[30%] h-[200px] w-[200px] animate-float-slow-reverse rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.025),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-[18%] left-[35%] h-[280px] w-[280px] animate-glow-pulse rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.02),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center"
        >
          <p className="mx-auto inline-flex rounded-full border border-white/[0.075] bg-white/[0.04] px-3 py-1.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-zinc-500">
            Your GPA Estimate
          </p>
          <div className="relative mt-5">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="animate-glow-pulse h-24 w-48 rounded-full bg-white/[0.04] blur-3xl" />
            </div>
            <p className="relative text-[clamp(4rem,12vw,7rem)] font-semibold leading-none tracking-[-0.065em] text-zinc-100 tabular-nums">
              {animatedGpa.toFixed(2)}
            </p>
          </div>
          <p className="mt-4 text-sm leading-6 text-zinc-500">
            Possible range{" "}
            <span className="font-semibold text-zinc-300">
              {range_low.toFixed(2)} – {range_high.toFixed(2)}
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-9 flex flex-col items-center"
        >
          <div className="w-full max-w-md rounded-[24px] border border-white/[0.075] bg-[linear-gradient(145deg,rgba(255,255,255,0.062),rgba(255,255,255,0.03)_48%,rgba(255,255,255,0.045))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
            <div className="flex justify-center">
              <GpaGauge value={predicted_gpa} rangeLow={range_low} rangeHigh={range_high} size={280} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-zinc-600">
                  Lower Bound
                </p>
                <p className="mt-2 font-mono text-xl font-semibold text-zinc-200">
                  {range_low.toFixed(2)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-zinc-600">
                  Upper Bound
                </p>
                <p className="mt-2 font-mono text-xl font-semibold text-zinc-200">
                  {range_high.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {warnings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="mt-5 space-y-2"
          >
            {warnings.map((warning, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-2xl border border-amber-300/15 bg-amber-300/8 p-4 text-sm leading-6 text-zinc-400"
              >
                <AlertTriangle className="mt-0.5 shrink-0 text-amber-200/80" size={18} />
                <span>{warning}</span>
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-5 flex gap-4 rounded-[20px] border border-white/[0.07] bg-white/[0.035] p-5"
        >
          <ShieldAlert className="mt-0.5 shrink-0 text-zinc-500" size={20} />
          <p className="text-sm leading-relaxed text-zinc-600">
            This prediction does not determine your final GPA. It's simply a statistical benchmark based on patterns from other students data. Many factors beyond this model influence your academic journey. What truly matters is your consistency, effort, and willingness to keep learning. Use this as a moment of reflection, stay motivated, and remember that your dedication is what shapes your future, not a number.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.75 }}
          className="mt-8 flex justify-center"
        >
          <AnimatedButton onClick={onRestart}>
            Predict Again
          </AnimatedButton>
        </motion.div>
      </div>
    </motion.div>
  );
}
