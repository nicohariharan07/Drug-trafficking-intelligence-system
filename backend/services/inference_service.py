
import os, joblib
from config import MODEL_PATH

def predict_message(text: str):
    if not os.path.exists(MODEL_PATH):
        raise RuntimeError("Model not trained")

    model = joblib.load(MODEL_PATH)
    prob = float(model.predict_proba([text])[0][1])

    if prob > 0.75:
        risk = "HIGH"
    elif prob > 0.4:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    return {"probability": round(prob,3), "risk_level": risk}
