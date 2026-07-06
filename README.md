# ScholarIQ

Platform prediksi estimasi IPK berbasis machine learning untuk mahasiswa.
Terdiri dari backend **FastAPI** (menyajikan model `.pkl` yang sudah dilatih)
dan frontend **React + Vite + Tailwind CSS + Framer Motion**.

Model: `Pipeline(StandardScaler + LinearRegression)`, R² validasi 0.596,
RMSE 0.409. Ini sudah diverifikasi cocok dengan urutan fitur, koefisien,
dan skala training pada spesifikasi proyek.

---

## Struktur Proyek

```
scholariq/
├── backend/      # FastAPI: load model, endpoint /predict, dokumentasi otomatis di /docs
└── frontend/     # React: landing page, form multi-step, halaman hasil
```

## Menjalankan Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

- API berjalan di `http://localhost:8000`
- Dokumentasi interaktif (Swagger) di `http://localhost:8000/docs`
- Endpoint utama: `POST /predict`

Catatan versi: model dilatih dengan scikit-learn 1.6.1. `requirements.txt`
sudah mengunci versi ini agar pipeline (termasuk `StandardScaler` di
dalamnya) ter-load tanpa masalah kompatibilitas.

### Contoh request

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "previous_gpa": 3.2,
    "digital_literacy": 7,
    "attendance_rate": 85,
    "revision_hours": 1.5,
    "study_hours_daily": 3.0,
    "screen_time": 4.0,
    "online_course_hours": 2.0,
    "mental_stress": 5
  }'
```

`attendance_rate` dikirim dalam **persen (0-100)** — backend yang
mengonversinya ke proporsi 0-1 sebelum masuk ke model.

## Menjalankan Frontend

```bash
cd frontend
npm install
cp .env.example .env    # sesuaikan VITE_API_BASE_URL bila backend tidak di localhost:8000
npm run dev
```

Frontend berjalan di `http://localhost:5173` (default Vite) dan akan
memanggil backend di `VITE_API_BASE_URL` (default `http://localhost:8000`).

## Build untuk Production

```bash
cd frontend
npm run build       # menghasilkan folder dist/ siap deploy (Vercel, Netlify, dll)
```

Untuk backend, deploy sebagai layanan Python biasa (Railway, Render, Fly.io,
VPS + gunicorn/uvicorn). Pastikan environment variable
`SCHOLARIQ_ALLOWED_ORIGINS` diisi dengan domain frontend yang sebenarnya
(pisahkan dengan koma jika lebih dari satu), menggantikan default `*`.

## Alur Aplikasi

1. **Landing Page** — perkenalan ScholarIQ, cara kerja 3 langkah, disclaimer, CTA.
2. **Form 3 Langkah** — Riwayat Akademik → Kebiasaan Belajar → Gaya Hidup & Kesejahteraan.
3. **Halaman Hasil** — estimasi IPK dalam bentuk rentang, gauge visual 0-4,
   daftar faktor paling berpengaruh, dan disclaimer akhir.

## Keterbatasan yang Perlu Diketahui

Model ini memiliki R² 0.596 — artinya sekitar 60% variasi IPK bisa
dijelaskan oleh fitur yang tersedia, sisanya dipengaruhi faktor lain
di luar model. Ini sudah dikomunikasikan secara eksplisit ke pengguna
lewat disclaimer di landing page dan halaman hasil.
