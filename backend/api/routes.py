from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
import random

from state import alerts, reports, summary, trends

router = APIRouter(prefix="/api")

# ---------- MODELS ----------
class TextInput(BaseModel):
    text: str


# ---------- SUMMARY ----------
@router.get("/summary")
def get_summary():
    return summary


# ---------- ALERTS ----------
@router.get("/alerts")
def get_alerts():
    return alerts[::-1]  # latest first


# ---------- REPORTS ----------
@router.get("/reports")
def get_reports():
    return reports[::-1]


# ---------- NETWORK ----------
@router.get("/network")
def get_network():
    nodes = []
    edges = []

    for idx, alert in enumerate(alerts):
        nodes.append({"id": f"alert_{idx}", "type": "alert"})
        if idx > 0:
            edges.append({"source": f"alert_{idx-1}", "target": f"alert_{idx}"})

    return {"nodes": nodes, "edges": edges}


# ---------- TRENDS ----------
@router.get("/trends")
def get_trends():
    return trends


# ---------- ML PREDICTION ----------
@router.post("/predict")
def predict_text(data: TextInput):
    # ⚠️ replace this with your real ML model prediction
    probability = round(random.uniform(0.3, 0.95), 2)

    if probability >= 0.7:
        risk = "HIGH"
    elif probability >= 0.5:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    # ---- UPDATE STATE DYNAMICALLY ----
    if risk != "LOW":
        alert_id = f"ALT-{len(alerts)+1}"
        alerts.append({
            "id": alert_id,
            "severity": risk.capitalize(),
            "message": data.text,
            "timestamp": datetime.utcnow().isoformat(),
            "platform": "Manual Input"
        })

        reports.append({
            "clusterId": f"CLU-{len(reports)+1}",
            "platform": "Manual",
            "riskScore": int(probability * 100),
            "confidence": random.randint(80, 95),
            "status": "Active"
        })

        summary["totalFlagged"] += 1

        if risk == "HIGH":
            summary["highRisk"] += 1
            summary["riskDistribution"]["high"] += 1
        else:
            summary["mediumRisk"] += 1
            summary["riskDistribution"]["medium"] += 1
    else:
        summary["riskDistribution"]["low"] += 1

    # ---- UPDATE TRENDS ----
    today = datetime.utcnow().strftime("%Y-%m-%d")
    trends.append({
        "date": today,
        "activities": 1,
        "platform": "Manual"
    })

    return {
        "probability": probability,
        "risk_level": risk
    }
