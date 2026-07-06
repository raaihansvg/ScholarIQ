import os

DIREKTORI_UTAMA = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(DIREKTORI_UTAMA, "model", "gpa_predictor_model.pkl")

ALLOWED_ORIGINS = os.environ.get("SCHOLARIQ_ALLOWED_ORIGINS", "*")
if ALLOWED_ORIGINS != "*":
    ALLOWED_ORIGINS = [o.strip() for o in ALLOWED_ORIGINS.split(",")]
else:
    ALLOWED_ORIGINS = ["*"]

FEATURE_ORDER = [
    "previous_gpa",
    "digital_literacy",
    "attendance_rate",
    "revision_hours",
    "study_hours_daily",
    "screen_time",
    "online_course_hours",
    "mental_stress",
]

RENTANG_TRAINING = {
    "previous_gpa": (0.0, 4.0),
    "digital_literacy": (0.0, 10.0),
    "attendance_rate": (0.0, 1.0),
    "revision_hours": (0.0, 5.9),
    "study_hours_daily": (0.0, 8.6),
    "screen_time": (1.0, 11.2),
    "online_course_hours": (0.0, 18.4),
    "mental_stress": (0.0, 10.0),
}

LABEL_FITUR = {
    "previous_gpa": "IPK Semester Lalu",
    "digital_literacy": "Kemahiran Teknologi Digital",
    "attendance_rate": "Tingkat Kehadiran",
    "revision_hours": "Jam Mengulang Materi per Hari",
    "study_hours_daily": "Rata-rata Jam Belajar per Hari",
    "screen_time": "Waktu Layar di Luar Belajar per Hari",
    "online_course_hours": "Jam Kursus Online per Minggu",
    "mental_stress": "Tingkat Stres",
}

PREDICTION_MARGIN = 0.41
