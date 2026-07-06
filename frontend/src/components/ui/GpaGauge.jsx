import { useMemo } from "react";
import { motion } from "framer-motion";

const SKALA_MIN = 0;
const SKALA_MAX = 4;
const SUDUT_AWAL = 180;
const SUDUT_AKHIR = 0;

function nilaiKeSudut(nilai) {
  const terbatas = Math.min(SKALA_MAX, Math.max(SKALA_MIN, nilai));
  const rasio = (terbatas - SKALA_MIN) / (SKALA_MAX - SKALA_MIN);
  return SUDUT_AWAL + rasio * (SUDUT_AKHIR - SUDUT_AWAL);
}

function polarKeKartesian(cx, cy, r, sudutDerajat) {
  const sudutRadian = (sudutDerajat * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(sudutRadian),
    y: cy - r * Math.sin(sudutRadian),
  };
}

function buatBusur(cx, cy, r, sudutMulai, sudutSelesai) {
  const titikAwal = polarKeKartesian(cx, cy, r, sudutMulai);
  const titikAkhir = polarKeKartesian(cx, cy, r, sudutSelesai);
  const busurBesar = Math.abs(sudutMulai - sudutSelesai) <= 180 ? 0 : 1;
  const arahSapu = 1;
  return `M ${titikAwal.x} ${titikAwal.y} A ${r} ${r} 0 ${busurBesar} ${arahSapu} ${titikAkhir.x} ${titikAkhir.y}`;
}

export default function GpaGauge({
  value,
  rangeLow,
  rangeHigh,
  size = 280,
  animate: animasiAktif = true,
  tickColor,
}) {
  const cx = size / 2;
  const cy = size / 2 + 10;
  const r = size / 2 - 24;
  const lebarGaris = 16;

  const kelilingSetengah = Math.PI * r;

  const jalurLatar = useMemo(
    () => buatBusur(cx, cy, r, SUDUT_AWAL, SUDUT_AKHIR),
    [cx, cy, r]
  );

  const jalurRentang = useMemo(() => {
    const sudutBawah = nilaiKeSudut(rangeLow);
    const sudutAtas = nilaiKeSudut(rangeHigh);
    return buatBusur(cx, cy, r, sudutBawah, sudutAtas);
  }, [cx, cy, r, rangeLow, rangeHigh]);

  const rasioNilai = (Math.min(SKALA_MAX, Math.max(0, value)) - SKALA_MIN) / (SKALA_MAX - SKALA_MIN);
  const panjangBusurNilai = kelilingSetengah * rasioNilai;

  const sudutJarum = nilaiKeSudut(value);
  const ujungJarum = polarKeKartesian(cx, cy, r, sudutJarum);

  const daftarTanda = [0, 1, 2, 3, 4];

  return (
    <div className="relative" style={{ width: size, height: size / 2 + 60 }}>
      <svg width={size} height={size / 2 + 60} viewBox={`0 0 ${size} ${size / 2 + 60}`}>
        <path
          d={jalurLatar}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={lebarGaris}
          strokeLinecap="round"
        />

        <motion.path
          d={jalurRentang}
          fill="none"
          stroke="#F2F1EE"
          strokeOpacity={0.18}
          strokeWidth={lebarGaris + 6}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: animasiAktif ? 0.9 : 0, ease: "easeOut" }}
        />

        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#777777" />
            <stop offset="55%" stopColor="#D7D6D2" />
            <stop offset="100%" stopColor="#F2F1EE" />
          </linearGradient>
        </defs>
        <motion.path
          d={jalurLatar}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={lebarGaris}
          strokeLinecap="round"
          strokeDasharray={kelilingSetengah}
          initial={{ strokeDashoffset: kelilingSetengah }}
          animate={{ strokeDashoffset: kelilingSetengah - panjangBusurNilai }}
          transition={{ duration: animasiAktif ? 1.3 : 0, ease: "easeOut" }}
        />

        <motion.circle
          cx={ujungJarum.x}
          cy={ujungJarum.y}
          r={7}
          fill="#0F0F10"
          stroke="#F2F1EE"
          strokeWidth={3}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: animasiAktif ? 1.2 : 0, ease: "easeOut" }}
        />

        {daftarTanda.map((tanda) => {
          const sudut = nilaiKeSudut(tanda);
          const posisi = polarKeKartesian(cx, cy, r + 26, sudut);
          return (
            <text
              key={tanda}
              x={posisi.x}
              y={posisi.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={tickColor || "rgba(255,255,255,0.34)"}
              fontSize="12"
              fontFamily="Inter, sans-serif"
            >
              {tanda}.0
            </text>
          );
        })}
      </svg>
    </div>
  );
}
