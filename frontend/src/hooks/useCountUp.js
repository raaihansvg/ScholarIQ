import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

export function useCountUp(nilaiTarget, durasi = 1.2, desimal = 2) {
  const [nilaiSaatIni, setNilaiSaatIni] = useState(0);
  const referensiKontrol = useRef(null);

  useEffect(() => {
    referensiKontrol.current = animate(0, nilaiTarget, {
      duration: durasi,
      ease: "easeOut",
      onUpdate: (terbaru) => setNilaiSaatIni(terbaru),
    });
    return () => referensiKontrol.current?.stop();
  }, [nilaiTarget]);

  return Number(nilaiSaatIni.toFixed(desimal));
}
