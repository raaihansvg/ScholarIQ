from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from config import ALLOWED_ORIGINS
from predictor import predictor
from schemas import PredictionRequest, PredictionResponse, HealthResponse


@asynccontextmanager
async def siklus_hidup(app: FastAPI):
    predictor.load()
    yield


app = FastAPI(
    title="ScholarIQ API",
    description="API prediksi estimasi IPK berdasarkan kebiasaan belajar dan gaya hidup mahasiswa.",
    version="1.0.0",
    lifespan=siklus_hidup,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_model=HealthResponse, tags=["Health"])
def cek_status() -> HealthResponse:
    return HealthResponse(status="ok", model_loaded=predictor.is_loaded)


@app.get("/health", response_model=HealthResponse, tags=["Health"])
def cek_kesehatan() -> HealthResponse:
    return HealthResponse(status="ok", model_loaded=predictor.is_loaded)


@app.post("/predict", response_model=PredictionResponse, tags=["Prediksi"])
def proses_prediksi(payload: PredictionRequest) -> PredictionResponse:
    try:
        return predictor.predict(payload)
    except RuntimeError as kesalahan:
        raise HTTPException(status_code=503, detail=str(kesalahan)) from kesalahan
    except Exception as kesalahan:
        raise HTTPException(status_code=400, detail=f"Gagal memproses prediksi: {kesalahan}") from kesalahan
