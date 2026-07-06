import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Navbar({ onStart }) {

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-white/[0.035] bg-[#171719]/95 backdrop-blur-md"
    >
      <nav
        className="mx-auto flex h-[3.15rem] max-w-[1440px] items-center justify-between px-5 sm:px-7 lg:px-8"
        aria-label="Primary navigation"
      >
        <div className="flex items-center gap-7">
          <div className="flex items-center">
            <span className="text-lg font-bold tracking-tight text-white cursor-default select-none">ScholarIQ</span>
          </div>
          <div className="hidden items-center gap-6 sm:flex">
            <a
              href="#top"
              className="text-[0.65rem] font-semibold text-zinc-500 transition-colors duration-200 hover:text-zinc-200"
            >
              Home
            </a>
            <a
              href="#methodology"
              className="text-[0.65rem] font-semibold text-zinc-500 transition-colors duration-200 hover:text-zinc-200"
            >
              Why ScholarIQ
            </a>
            <a
              href="#about"
              className="text-[0.65rem] font-semibold text-zinc-500 transition-colors duration-200 hover:text-zinc-200"
            >
              About
            </a>
          </div>
        </div>

        <Button
          type="button"
          size="sm"
          onClick={onStart}
          className="h-8 rounded-full bg-[#F2F1EE] px-5 text-[0.68rem] font-semibold text-zinc-950 shadow-none transition-all duration-200 hover:bg-white hover:shadow-[0_0_18px_rgba(255,255,255,0.08)]"
        >
          Start Prediction
        </Button>
      </nav>
    </motion.header>
  );
}
