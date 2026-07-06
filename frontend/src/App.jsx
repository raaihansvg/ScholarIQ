import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HalamanUtama from "./components/LandingPage";
import FormulirPrediksi from "./components/PredictionForm";
import HalamanHasil from "./components/ResultPage";

const TAMPILAN = {
  LANDING: "landing",
  FORM: "form",
  RESULT: "result",
};

export default function App() {
  const [halamanAktif, setHalamanAktif] = useState(TAMPILAN.LANDING);
  const [hasilPrediksi, setHasilPrediksi] = useState(null);

  function mulaiPrediksi() {
    setHalamanAktif(TAMPILAN.FORM);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selesaiPrediksi(result) {
    setHasilPrediksi(result);
    setHalamanAktif(TAMPILAN.RESULT);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function kembaliKeUtama() {
    setHalamanAktif(TAMPILAN.LANDING);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function ulangiPrediksi() {
    setHasilPrediksi(null);
    setHalamanAktif(TAMPILAN.FORM);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence mode="wait">
      {halamanAktif === TAMPILAN.FORM && (
        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <FormulirPrediksi onComplete={selesaiPrediksi} onBack={kembaliKeUtama} />
        </motion.div>
      )}

      {halamanAktif === TAMPILAN.RESULT && hasilPrediksi && (
        <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <HalamanHasil result={hasilPrediksi} onRestart={ulangiPrediksi} />
        </motion.div>
      )}

      {halamanAktif === TAMPILAN.LANDING && (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <HalamanUtama onStart={mulaiPrediksi} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
