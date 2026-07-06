import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTA({ onStart }) {
  return (
    <section id="about" className="px-6 pb-20 pt-3 sm:px-8 lg:pb-24 lg:pt-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto flex min-h-[275px] max-w-[1296px] flex-col items-center justify-center rounded-[20px] border border-white/[0.075] bg-[linear-gradient(115deg,rgba(255,255,255,0.07),rgba(255,255,255,0.035)_45%,rgba(255,255,255,0.055))] px-6 py-12 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] sm:min-h-[300px] sm:rounded-[22px] sm:px-10"
      >
        <h2 className="max-w-4xl text-[1.85rem] font-semibold leading-tight tracking-[-0.05em] text-zinc-300 sm:text-[2.35rem]">
          AI Powered GPA Prediction.
        </h2>
        <p className="mt-6 max-w-xl text-xs leading-5 text-zinc-500 sm:text-[0.82rem] sm:leading-5">
          Discover your predicted GPA through AI-powered analysis of your academic habits and learning patterns.
        </p>
        <Button
          type="button"
          onClick={onStart}
          className="mt-9 h-[3.15rem] rounded-full bg-[#F2F1EE] px-9 text-[0.82rem] font-semibold text-zinc-950 shadow-none transition-all duration-200 hover:scale-[1.015] hover:bg-white hover:shadow-[0_0_22px_rgba(255,255,255,0.08)] active:scale-[0.985]"
        >
          Start Prediction
        </Button>
      </motion.div>
    </section>
  );
}
