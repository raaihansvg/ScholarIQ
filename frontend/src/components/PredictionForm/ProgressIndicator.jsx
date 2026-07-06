import { motion } from "framer-motion";

export default function ProgressIndicator({ currentStep, totalSteps, stepLabels }) {
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="mb-4 grid grid-cols-3 gap-3">
        {stepLabels.map((label, i) => (
          <motion.span
            key={label}
            animate={{
              opacity: i + 1 <= currentStep ? 1 : 0.42,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`rounded-full border px-3 py-2 text-center text-[0.62rem] font-semibold uppercase tracking-[0.08em] ${
              i + 1 <= currentStep
                ? "border-white/[0.11] bg-white/[0.055] text-zinc-200"
                : "border-white/[0.055] bg-white/[0.025] text-zinc-600"
            }`}
          >
            {label}
          </motion.span>
        ))}
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.07]">
        <motion.div
          className="h-full rounded-full bg-[#F2F1EE]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        />
      </div>
      <p className="mt-3 text-center text-[0.68rem] font-medium uppercase tracking-[0.14em] text-zinc-600">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
