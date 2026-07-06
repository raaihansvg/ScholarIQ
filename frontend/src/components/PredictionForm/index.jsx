import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";
import AnimatedButton from "../ui/AnimatedButton";
import ProgressIndicator from "./ProgressIndicator";
import StepAcademic from "./StepAcademic";
import StepHabits from "./StepHabits";
import StepLifestyle from "./StepLifestyle";
import { getGpaPrediction } from "../../api/predictService";

const STEP_LABELS = ["Academic History", "Study Habits", "Lifestyle"];

const INITIAL_VALUES = {
  previous_gpa: 3.0,
  attendance_rate: 85,
  study_hours_daily: 3,
  revision_hours: 1,
  online_course_hours: 2,
  screen_time: 4,
  mental_stress: 5,
  digital_literacy: 5,
};

const STEP_FIELDS = [
  ["previous_gpa", "attendance_rate"],
  ["study_hours_daily", "revision_hours", "online_course_hours"],
  ["screen_time", "mental_stress", "digital_literacy"],
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 32 : -32,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({
    x: direction > 0 ? -32 : 32,
    opacity: 0,
  }),
};

export default function PredictionForm({ onComplete, onBack }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const totalSteps = 3;

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  }

  function validateStep(currentStep) {
    const fields = STEP_FIELDS[currentStep - 1];
    const newErrors = {};
    fields.forEach((field) => {
      const value = values[field];
      if (value === "" || value === null || value === undefined || Number.isNaN(value)) {
        newErrors[field] = "This field is required.";
      }
    });
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    if (step < totalSteps) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  }

  function goBack() {
    if (step === 1) {
      onBack?.();
      return;
    }
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await getGpaPrediction(values);
      onComplete(result);
    } catch (err) {
      setSubmitError(err.message || "Failed to process prediction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const stepProps = { values, errors, onChange: handleChange };
  const currentLabel = STEP_LABELS[step - 1];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative min-h-screen overflow-x-hidden bg-[#0F0F10] px-6 pt-10 pb-24 text-zinc-200 sm:px-8 sm:pt-14 sm:pb-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.055),rgba(255,255,255,0.018)_34%,rgba(255,255,255,0)_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.012),rgba(255,255,255,0)_28%,rgba(0,0,0,0.12)_100%)]" />

      {/* Floating gradient orbs */}
      <div className="pointer-events-none absolute right-[10%] top-[8%] h-[200px] w-[200px] animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-[15%] left-[8%] h-[180px] w-[180px] animate-float-slow-reverse rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.025),transparent_70%)] blur-2xl" />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8 text-center"
        >

          <h1 className="mt-5 text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-zinc-200">
            {currentLabel}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-500">
            Fill in your information at your own pace. Each step is kept brief
            so the estimate stays focused and easy to understand.
          </p>
        </motion.div>

        <ProgressIndicator currentStep={step} totalSteps={totalSteps} stepLabels={STEP_LABELS} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
          className="overflow-hidden rounded-[24px] border border-white/[0.075] bg-[linear-gradient(145deg,rgba(255,255,255,0.062),rgba(255,255,255,0.03)_48%,rgba(255,255,255,0.045))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-7"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              {step === 1 && <StepAcademic {...stepProps} />}
              {step === 2 && <StepHabits {...stepProps} />}
              {step === 3 && <StepLifestyle {...stepProps} />}
            </motion.div>
          </AnimatePresence>

          {submitError && (
            <p className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {submitError}
            </p>
          )}

          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl border border-white/[0.07] bg-[#0F0F10]/70 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-white/[0.06] text-zinc-200">
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-200">Analyzing academic patterns</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-600">
                    The model is processing your data without modifying your input.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <AnimatedButton
              variant="ghost"
              onClick={goBack}
              disabled={isSubmitting}
              icon={ArrowLeft}
              iconPosition="left"
            >
              Back
            </AnimatedButton>

            <AnimatedButton onClick={goNext} disabled={isSubmitting} icon={isSubmitting ? undefined : ArrowRight}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Processing...
                </>
              ) : step === totalSteps ? (
                "See Estimate"
              ) : (
                "Next"
              )}
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
