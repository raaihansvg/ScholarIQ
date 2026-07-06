import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: "easeOut" },
  }),
};

const noticeText =
  "This prediction is generated using machine learning based on historical academic data. Results are estimates only and should not replace consistent study, academic advising, or institutional evaluation.";

export default function Hero({ onStart }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-3.15rem)] scroll-mt-14 items-center justify-center overflow-hidden bg-[#0F0F10] px-6 pb-16 pt-12 text-center sm:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.055),rgba(255,255,255,0.018)_34%,rgba(255,255,255,0)_68%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.012),rgba(255,255,255,0)_24%,rgba(0,0,0,0.1)_100%)]" />

      {/* Floating gradient orbs */}
      <div className="pointer-events-none absolute left-[15%] top-[18%] h-[220px] w-[220px] animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute right-[12%] top-[25%] h-[180px] w-[180px] animate-float-slow-reverse rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-[20%] left-[40%] h-[260px] w-[260px] animate-glow-pulse rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.025),transparent_65%)] blur-3xl" />

      <div className="relative mx-auto -mt-3 flex w-full max-w-3xl flex-col items-center sm:-mt-5">
        <motion.h1
          custom={0.08}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-[780px] text-[clamp(3rem,8.1vw,5.95rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-zinc-200"
        >
          Predict Your
          <span className="block text-zinc-400">Academic Future.</span>
        </motion.h1>

        <motion.p
          custom={0.18}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-[620px] text-[0.95rem] leading-6 text-zinc-500 sm:text-base"
        >
          Leveraging machine learning to provide precise academic guidance
          based on historical performance patterns.
        </motion.p>

        <motion.div
          custom={0.28}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8"
        >
          <Button
            type="button"
            onClick={onStart}
            className="h-[3.25rem] rounded-full bg-[#F2F1EE] px-8 text-[0.82rem] font-semibold text-zinc-950 shadow-none transition-all duration-200 hover:scale-[1.015] hover:bg-white hover:shadow-[0_0_22px_rgba(255,255,255,0.08)] active:scale-[0.985]"
          >
            Start Prediction
            <ArrowRight className="ml-1 size-4" aria-hidden="true" />
          </Button>
        </motion.div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 overflow-hidden border-y border-white/[0.018] bg-[#181819]/75 py-2.5"
        aria-label="Prediction notice"
      >
        <div className="animate-marquee flex w-max whitespace-nowrap">
          <span className="px-10 font-mono text-[0.55rem] font-bold uppercase tracking-[0.18em] text-white">
            {noticeText}
          </span>
          <span className="px-10 font-mono text-[0.55rem] font-bold uppercase tracking-[0.18em] text-white">
            {noticeText}
          </span>
        </div>
      </div>
    </section>
  );
}
