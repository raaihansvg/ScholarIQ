export const LABEL_FITUR = {
  previous_gpa: "IPK Semester Lalu",
  digital_literacy: "Kemahiran Teknologi Digital",
  attendance_rate: "Tingkat Kehadiran",
  revision_hours: "Jam Mengulang Materi per Hari",
  study_hours_daily: "Rata-rata Jam Belajar per Hari",
  screen_time: "Waktu Layar di Luar Belajar per Hari",
  online_course_hours: "Jam Kursus Online per Minggu",
  mental_stress: "Tingkat Stres Akhir-akhir Ini",
};

export const NARASI_FAKTOR = {
  previous_gpa: {
    positive: "IPK semester lalu kamu menjadi salah satu fondasi terkuat dari estimasi ini — riwayat akademik yang baik cenderung terus berlanjut.",
    negative: "IPK semester lalu yang masih di bawah target ikut menekan estimasi ini — ini bisa jadi titik awal untuk diperbaiki.",
  },
  digital_literacy: {
    positive: "Kemahiran teknologi digital kamu membantu mendorong estimasi ke arah yang lebih baik, kemungkinan karena mempermudah akses dan pengolahan materi belajar.",
    negative: "Kemahiran teknologi digital yang masih berkembang sedikit menahan estimasi ini — semakin terbiasa dengan alat bantu belajar digital, biasanya semakin terbantu.",
  },
  attendance_rate: {
    positive: "Tingkat kehadiran yang konsisten menjadi salah satu pendorong utama estimasi ini.",
    negative: "Tingkat kehadiran yang belum optimal ikut menahan estimasi ini — kehadiran yang lebih konsisten biasanya berdampak nyata.",
  },
  online_course_hours: {
    positive: "Waktu yang kamu luangkan untuk kursus online turut mendorong estimasi ke arah yang lebih baik.",
    negative: "Jam kursus online yang masih minim sedikit menahan estimasi ini.",
  },
  revision_hours: {
    positive: "Kebiasaan mengulang materi secara rutin ikut mendorong estimasi ke arah yang lebih baik.",
    negative: "Waktu mengulang materi yang masih terbatas sedikit menahan estimasi ini.",
  },
  study_hours_daily: {
    positive: "Jam belajar harian yang konsisten turut mendukung estimasi ini.",
    negative: "Jam belajar harian yang masih singkat sedikit menahan estimasi ini.",
  },
  screen_time: {
    positive: "Waktu layar non-belajar kamu berada di titik yang cukup seimbang, sehingga tidak banyak mengganggu estimasi.",
    negative: "Waktu layar di luar belajar yang cukup tinggi tampaknya sedikit menurunkan estimasi ini — mengurangi screen time bisa membantu.",
  },
  mental_stress: {
    positive: "Tingkat stres kamu relatif terkendali, sehingga mendukung estimasi ke arah yang lebih baik.",
    negative: "Tingkat stres yang cukup tinggi cenderung menurunkan estimasi ini — menjaga kesejahteraan mental bisa membantu performa akademik.",
  },
};

export function ambilLabelFitur(feature) {
  return LABEL_FITUR[feature] || feature;
}

export function ambilNarasiFaktor(feature, impact) {
  const entri = NARASI_FAKTOR[feature];
  if (!entri) return "";
  return entri[impact] || "";
}
