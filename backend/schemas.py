from typing import List, Optional
from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    previous_gpa: float = Field(..., description="IPK semester lalu (skala 0.0 - 4.0)")
    digital_literacy: float = Field(..., description="Kemahiran teknologi digital (skala 0 - 10)")
    attendance_rate: float = Field(..., description="Tingkat kehadiran dalam PERSEN (0 - 100)")
    revision_hours: float = Field(..., description="Jam mengulang materi per hari")
    study_hours_daily: float = Field(..., description="Rata-rata jam belajar per hari")
    screen_time: float = Field(..., description="Waktu layar non-belajar per hari (jam)")
    online_course_hours: float = Field(..., description="Jam kursus online per minggu")
    mental_stress: float = Field(..., description="Tingkat stres (skala 0 - 10)")


class TopFactor(BaseModel):
    feature: str
    impact: str
    label: str


class PredictionResponse(BaseModel):
    predicted_gpa: float
    range_low: float
    range_high: float
    top_factors: List[TopFactor]
    warnings: List[str]


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
