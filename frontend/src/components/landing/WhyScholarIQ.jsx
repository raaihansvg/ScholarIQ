import { motion } from "framer-motion";

const features = [
  {
    title: "Machine Learning",
    description:
      "Advanced neural architectures designed specifically for academic trajectory modeling.",
  },
  {
    title: "Fast Prediction",
    description:
      "Real-time inference engines providing immediate feedback on historical data inputs.",
  },
  {
    title: "Privacy First",
    description:
      "Encrypted data processing ensuring your academic records remain confidential and secure.",
  },
  {
    title: "Academic Insight",
    description:
      "Deep analysis of learning patterns to uncover hidden correlations in performance.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

export default function WhyScholarIQ() {
  return (
    <section
      id="methodology"
      className="px-6 pb-16 pt-14 text-zinc-200 sm:px-8 sm:pt-16 lg:pb-20"
    >
      <div className="mx-auto max-w-[1296px]">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="max-w-[800px]"
        >
          <h2 className="text-[1.7rem] font-semibold leading-tight tracking-[-0.04em] text-zinc-300 sm:text-[1.92rem]">
            Why ScholarIQ.
          </h2>
          <p className="mt-5 max-w-[800px] text-sm leading-6 text-zinc-500 sm:text-[0.95rem] sm:leading-6">
            We don't rely on guesswork. Our models analyze thousands of data
            points across your historical performance to identify subtle
            patterns invisible to the human eye, constructing a probabilistic
            map of your academic trajectory.
          </p>
        </motion.div>

        <div className="mt-12 divide-y divide-white/[0.09] border-t border-white/[0.055]">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              custom={0.08 + index * 0.08}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="grid gap-3 py-6 sm:grid-cols-[210px_1fr] sm:items-center lg:grid-cols-[245px_1fr]"
            >
              <h3 className="text-[1.08rem] font-semibold tracking-[-0.03em] text-zinc-300 sm:text-[1.18rem]">
                {feature.title}
              </h3>
              <p className="max-w-[590px] text-xs leading-5 text-zinc-600 sm:text-[0.82rem]">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
