# backend/state.py
from datetime import datetime

alerts = []
reports = []

summary = {
    "totalFlagged": 0,
    "highRisk": 0,
    "mediumRisk": 0,
    "platformsMonitored": 3,
    "riskDistribution": {
        "high": 0,
        "medium": 0,
        "low": 0
    }
}

trends = []  # daily activity counts
