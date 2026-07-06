const ALAMAT_API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function getGpaPrediction(dataFormulir) {
  const tanggapan = await fetch(`${ALAMAT_API}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataFormulir),
  });

  if (!tanggapan.ok) {
    let pesanError = "An error occurred while processing the prediction. Please try again.";
    try {
      const bodyError = await tanggapan.json();
      if (bodyError?.detail) pesanError = bodyError.detail;
    } catch {
    }
    throw new Error(pesanError);
  }

  return tanggapan.json();
}
