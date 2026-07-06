from typing import Dict, List, Tuple

import joblib
import pandas as pd

from config import (
    FEATURE_ORDER,
    RENTANG_TRAINING,
    LABEL_FITUR,
    PREDICTION_MARGIN,
    MODEL_PATH,
)
from schemas import PredictionRequest, PredictionResponse, TopFactor


class GPAPredictor:

    def __init__(self, lokasi_model: str = MODEL_PATH):
        self._lokasi_model = lokasi_model
        self._model = None

    def load(self) -> None:
        self._model = joblib.load(self._lokasi_model)

    @property
    def is_loaded(self) -> bool:
        return self._model is not None

    @staticmethod
    def _konversi_input(payload: PredictionRequest) -> Dict[str, float]:
        data_mentah = payload.model_dump()
        data_mentah["attendance_rate"] = data_mentah["attendance_rate"] / 100.0
        return data_mentah

    @staticmethod
    def _cek_diluar_rentang(data_terkonversi: Dict[str, float]) -> List[str]:
        daftar_peringatan: List[str] = []
        for fitur, (batas_bawah, batas_atas) in RENTANG_TRAINING.items():
            nilai = data_terkonversi[fitur]
            if nilai < batas_bawah or nilai > batas_atas:
                label_fitur = LABEL_FITUR[fitur]
                daftar_peringatan.append(
                    f"Nilai untuk '{label_fitur}' berada di luar rentang data training "
                    f"yang pernah dipelajari model, sehingga estimasi untuk bagian "
                    f"ini mungkin kurang akurat."
                )
        return daftar_peringatan

    def _hitung_faktor_utama(self, data_terkonversi: Dict[str, float], jumlah_teratas: int = 3) -> List[TopFactor]:
        tahap_pra = self._model.named_steps["pre"]
        model_regresi = self._model.named_steps["model"]

        penskalaan = tahap_pra.named_transformers_["num"].named_steps["scaler"]
        rata_rata = penskalaan.mean_
        skala_nilai = penskalaan.scale_
        koefisien = model_regresi.coef_

        daftar_kontribusi: List[Tuple[str, float]] = []
        for indeks, fitur in enumerate(FEATURE_ORDER):
            nilai_mentah = data_terkonversi[fitur]
            nilai_terskalakan = (nilai_mentah - rata_rata[indeks]) / skala_nilai[indeks]
            kontribusi = nilai_terskalakan * koefisien[indeks]
            daftar_kontribusi.append((fitur, kontribusi))

        daftar_kontribusi.sort(key=lambda x: abs(x[1]), reverse=True)

        faktor_teratas: List[TopFactor] = []
        for fitur, kontribusi in daftar_kontribusi[:jumlah_teratas]:
            dampak = "positive" if kontribusi >= 0 else "negative"
            faktor_teratas.append(
                TopFactor(
                    feature=fitur,
                    impact=dampak,
                    label=LABEL_FITUR[fitur],
                )
            )
        return faktor_teratas

    def predict(self, payload: PredictionRequest) -> PredictionResponse:
        if not self.is_loaded:
            raise RuntimeError("Model belum di-load. Panggil .load() saat startup aplikasi.")

        data_terkonversi = self._konversi_input(payload)
        daftar_peringatan = self._cek_diluar_rentang(data_terkonversi)

        dataframe_input = pd.DataFrame([{fitur: data_terkonversi[fitur] for fitur in FEATURE_ORDER}])
        hasil_mentah = float(self._model.predict(dataframe_input)[0])

        gpa_prediksi = max(0.0, min(4.0, round(hasil_mentah, 2)))
        batas_bawah = round(max(0.0, gpa_prediksi - PREDICTION_MARGIN), 2)
        batas_atas = round(min(4.0, gpa_prediksi + PREDICTION_MARGIN), 2)

        faktor_teratas = self._hitung_faktor_utama(data_terkonversi)

        return PredictionResponse(
            predicted_gpa=gpa_prediksi,
            range_low=batas_bawah,
            range_high=batas_atas,
            top_factors=faktor_teratas,
            warnings=daftar_peringatan,
        )


predictor = GPAPredictor()
