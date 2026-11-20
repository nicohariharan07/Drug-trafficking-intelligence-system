# 🔌 Backend API Specification

## Overview

This document specifies the REST API endpoints required by the Drug Trafficking Intelligence System frontend. Implement these endpoints in your backend (Flask, Django, Node.js, etc.) to provide real data to the application.

**Base URL:** `http://localhost:5000/api`

---

## CORS Configuration

### Required Headers
```http
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Example (Flask)
```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
```

### Example (Express.js)
```javascript
const cors = require('cors');
app.use(cors());
```

---

## Authentication

Currently, the frontend uses **client-side authentication only** (for demo purposes).

### Future Enhancement
Add JWT tokens:
```http
Authorization: Bearer <token>
```

---

## Endpoints

### 1. Get Summary Data

**Endpoint:** `GET /api/summary`

**Description:** Returns dashboard summary metrics and risk distribution.

**Request:**
```http
GET /api/summary HTTP/1.1
Host: localhost:5000
Content-Type: application/json
```

**Response:** `200 OK`
```json
{
  "totalFlagged": 1247,
  "highRisk": 89,
  "mediumRisk": 234,
  "platformsMonitored": 12,
  "riskDistribution": {
    "high": 89,
    "medium": 234,
    "low": 924
  }
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `totalFlagged` | integer | Total number of flagged activities |
| `highRisk` | integer | Count of high-risk clusters |
| `mediumRisk` | integer | Count of medium-risk clusters |
| `platformsMonitored` | integer | Number of platforms being monitored |
| `riskDistribution.high` | integer | High-risk count |
| `riskDistribution.medium` | integer | Medium-risk count |
| `riskDistribution.low` | integer | Low-risk count |

**Error Response:** `500 Internal Server Error`
```json
{
  "error": "Failed to fetch summary data"
}
```

**Implementation Example (Flask):**
```python
@app.route('/api/summary', methods=['GET'])
def get_summary():
    try:
        # Your ML model or database query here
        data = {
            "totalFlagged": calculate_total_flagged(),
            "highRisk": count_high_risk(),
            "mediumRisk": count_medium_risk(),
            "platformsMonitored": count_platforms(),
            "riskDistribution": {
                "high": count_high_risk(),
                "medium": count_medium_risk(),
                "low": count_low_risk()
            }
        }
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
```

---

### 2. Get Alerts

**Endpoint:** `GET /api/alerts`

**Description:** Returns list of security alerts ordered by timestamp (newest first).

**Request:**
```http
GET /api/alerts HTTP/1.1
Host: localhost:5000
Content-Type: application/json
```

**Response:** `200 OK`
```json
[
  {
    "id": "ALT-001",
    "severity": "Critical",
    "message": "Suspicious behavioral pattern detected across multiple platforms",
    "timestamp": "2026-02-01T10:30:00Z",
    "platform": "Platform A"
  },
  {
    "id": "ALT-002",
    "severity": "High",
    "message": "Coordinated activity cluster identified",
    "timestamp": "2026-02-01T09:15:00Z",
    "platform": "Platform B"
  }
]
```

**Response Fields:**

| Field | Type | Description | Allowed Values |
|-------|------|-------------|----------------|
| `id` | string | Unique alert identifier | ALT-XXX format |
| `severity` | string | Alert severity level | "Critical", "High", "Medium", "Low" |
| `message` | string | Alert description | Any string |
| `timestamp` | string | ISO 8601 datetime | UTC timezone |
| `platform` | string | Platform name | Any string |

**Severity Levels:**
- `Critical` - Immediate action required
- `High` - High priority, review soon
- `Medium` - Moderate priority
- `Low` - Low priority, monitor

**Implementation Example (Flask):**
```python
@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    try:
        alerts = db.query(Alert).order_by(Alert.timestamp.desc()).all()
        return jsonify([{
            "id": alert.id,
            "severity": alert.severity,
            "message": alert.message,
            "timestamp": alert.timestamp.isoformat() + 'Z',
            "platform": alert.platform
        } for alert in alerts]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
```

---

### 3. Get Reports

**Endpoint:** `GET /api/reports`

**Description:** Returns list of cluster analysis reports.

**Request:**
```http
GET /api/reports HTTP/1.1
Host: localhost:5000
Content-Type: application/json
```

**Response:** `200 OK`
```json
[
  {
    "clusterId": "CLU-001",
    "platform": "Platform A",
    "riskScore": 92,
    "confidence": 88,
    "status": "Active"
  },
  {
    "clusterId": "CLU-002",
    "platform": "Platform B",
    "riskScore": 87,
    "confidence": 91,
    "status": "Monitoring"
  }
]
```

**Response Fields:**

| Field | Type | Description | Range/Values |
|-------|------|-------------|--------------|
| `clusterId` | string | Unique cluster identifier | CLU-XXX format |
| `platform` | string | Platform name | Any string |
| `riskScore` | integer | AI-calculated risk score | 0-100 |
| `confidence` | integer | Model confidence level | 0-100 |
| `status` | string | Case status | "Active", "Monitoring", "Resolved" |

**Risk Score Interpretation:**
- 80-100: High risk (red)
- 60-79: Medium risk (yellow)
- 0-59: Low risk (green)

**Status Values:**
- `Active` - Currently under active investigation
- `Monitoring` - Being monitored, no immediate action
- `Resolved` - Case closed

**Implementation Example (Flask):**
```python
@app.route('/api/reports', methods=['GET'])
def get_reports():
    try:
        reports = db.query(ClusterReport).all()
        return jsonify([{
            "clusterId": report.cluster_id,
            "platform": report.platform,
            "riskScore": report.risk_score,
            "confidence": report.confidence,
            "status": report.status
        } for report in reports]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
```

---

### 4. Get Network Data

**Endpoint:** `GET /api/network`

**Description:** Returns network graph data (nodes and edges) for visualization.

**Request:**
```http
GET /api/network HTTP/1.1
Host: localhost:5000
Content-Type: application/json
```

**Response:** `200 OK`
```json
{
  "nodes": [
    {
      "id": "node1",
      "type": "platform",
      "label": "Platform A",
      "riskLevel": "high"
    },
    {
      "id": "node2",
      "type": "cluster",
      "label": "CLU-001",
      "riskLevel": "high"
    },
    {
      "id": "node3",
      "type": "activity",
      "label": "Behavioral Pattern",
      "riskLevel": "medium"
    }
  ],
  "edges": [
    {
      "source": "node1",
      "target": "node2",
      "weight": 0.85
    },
    {
      "source": "node2",
      "target": "node3",
      "weight": 0.72
    }
  ]
}
```

**Node Fields:**

| Field | Type | Description | Values |
|-------|------|-------------|--------|
| `id` | string | Unique node identifier | Any string |
| `type` | string | Node type | "platform", "cluster", "activity" |
| `label` | string | Display label | Any string |
| `riskLevel` | string | Risk classification | "high", "medium", "low" |

**Edge Fields:**

| Field | Type | Description | Range |
|-------|------|-------------|-------|
| `source` | string | Source node ID | Must match node ID |
| `target` | string | Target node ID | Must match node ID |
| `weight` | float | Connection strength | 0.0-1.0 |

**Implementation Example (Flask):**
```python
@app.route('/api/network', methods=['GET'])
def get_network():
    try:
        nodes = get_network_nodes()  # Your function
        edges = get_network_edges()  # Your function
        
        return jsonify({
            "nodes": nodes,
            "edges": edges
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
```

---

### 5. Get Trends

**Endpoint:** `GET /api/trends`

**Description:** Returns temporal activity trends data for charting.

**Request:**
```http
GET /api/trends HTTP/1.1
Host: localhost:5000
Content-Type: application/json
```

**Optional Query Parameters:**
- `days` - Number of days to retrieve (default: 30)
- `platform` - Filter by specific platform

**Response:** `200 OK`
```json
[
  {
    "date": "2026-01-01",
    "activities": 45,
    "platform": "Platform A"
  },
  {
    "date": "2026-01-01",
    "activities": 32,
    "platform": "Platform B"
  },
  {
    "date": "2026-01-02",
    "activities": 52,
    "platform": "Platform A"
  }
]
```

**Response Fields:**

| Field | Type | Description | Format |
|-------|------|-------------|--------|
| `date` | string | Date of activity | YYYY-MM-DD |
| `activities` | integer | Activity count | Positive integer |
| `platform` | string | Platform name | Any string |

**Data Requirements:**
- At least 7 days of data recommended
- One entry per platform per day
- Dates in chronological order

**Implementation Example (Flask):**
```python
@app.route('/api/trends', methods=['GET'])
def get_trends():
    try:
        days = request.args.get('days', 30, type=int)
        platform = request.args.get('platform', None)
        
        trends = db.query(ActivityTrend)\
            .filter(ActivityTrend.date >= date.today() - timedelta(days=days))
        
        if platform:
            trends = trends.filter(ActivityTrend.platform == platform)
        
        trends = trends.all()
        
        return jsonify([{
            "date": trend.date.isoformat(),
            "activities": trend.count,
            "platform": trend.platform
        } for trend in trends]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
```

---

## Error Handling

### Standard Error Response
```json
{
  "error": "Error message description",
  "code": "ERROR_CODE",
  "details": "Additional details (optional)"
}
```

### HTTP Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful request |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server-side error |
| 503 | Service Unavailable | Temporary outage |

---

## Data Validation

### Summary Endpoint
```python
def validate_summary(data):
    assert 'totalFlagged' in data
    assert 'highRisk' in data
    assert 'mediumRisk' in data
    assert 'platformsMonitored' in data
    assert 'riskDistribution' in data
    assert data['totalFlagged'] >= 0
    assert data['highRisk'] >= 0
    assert data['mediumRisk'] >= 0
    assert data['platformsMonitored'] >= 0
```

### Alerts Endpoint
```python
def validate_alert(alert):
    assert 'id' in alert
    assert 'severity' in alert
    assert alert['severity'] in ['Critical', 'High', 'Medium', 'Low']
    assert 'message' in alert
    assert 'timestamp' in alert
    assert 'platform' in alert
```

### Reports Endpoint
```python
def validate_report(report):
    assert 'clusterId' in report
    assert 'platform' in report
    assert 'riskScore' in report
    assert 0 <= report['riskScore'] <= 100
    assert 'confidence' in report
    assert 0 <= report['confidence'] <= 100
    assert 'status' in report
    assert report['status'] in ['Active', 'Monitoring', 'Resolved']
```

---

## Rate Limiting (Optional)

### Recommended Limits
```
GET /api/summary:  60 requests/minute
GET /api/alerts:   60 requests/minute
GET /api/reports:  60 requests/minute
GET /api/network:  30 requests/minute
GET /api/trends:   30 requests/minute
```

### Rate Limit Headers
```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1612137600
```

---

## Caching (Optional)

### Cache-Control Headers
```http
Cache-Control: max-age=60, must-revalidate
```

### Recommended Cache Times
- Summary: 60 seconds
- Alerts: 30 seconds (real-time)
- Reports: 300 seconds (5 minutes)
- Network: 600 seconds (10 minutes)
- Trends: 3600 seconds (1 hour)

---

## Database Schema Suggestions

### Alerts Table
```sql
CREATE TABLE alerts (
    id VARCHAR(10) PRIMARY KEY,
    severity ENUM('Critical', 'High', 'Medium', 'Low'),
    message TEXT,
    timestamp TIMESTAMP,
    platform VARCHAR(50)
);
```

### Reports Table
```sql
CREATE TABLE cluster_reports (
    cluster_id VARCHAR(10) PRIMARY KEY,
    platform VARCHAR(50),
    risk_score INTEGER CHECK (risk_score BETWEEN 0 AND 100),
    confidence INTEGER CHECK (confidence BETWEEN 0 AND 100),
    status ENUM('Active', 'Monitoring', 'Resolved')
);
```

### Trends Table
```sql
CREATE TABLE activity_trends (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    platform VARCHAR(50),
    activities INTEGER,
    UNIQUE(date, platform)
);
```

---

## Testing Endpoints

### Using cURL

**Test Summary:**
```bash
curl -X GET http://localhost:5000/api/summary \
  -H "Content-Type: application/json"
```

**Test Alerts:**
```bash
curl -X GET http://localhost:5000/api/alerts \
  -H "Content-Type: application/json"
```

**Test Reports:**
```bash
curl -X GET http://localhost:5000/api/reports \
  -H "Content-Type: application/json"
```

### Using Python Requests
```python
import requests

response = requests.get('http://localhost:5000/api/summary')
print(response.json())
```

### Using Postman
1. Create new GET request
2. URL: `http://localhost:5000/api/summary`
3. Headers: `Content-Type: application/json`
4. Send

---

## Sample Backend Implementation (Flask)

```python
from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

@app.route('/api/summary', methods=['GET'])
def get_summary():
    return jsonify({
        "totalFlagged": 1247,
        "highRisk": 89,
        "mediumRisk": 234,
        "platformsMonitored": 12,
        "riskDistribution": {
            "high": 89,
            "medium": 234,
            "low": 924
        }
    })

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    alerts = [
        {
            "id": f"ALT-{str(i).zfill(3)}",
            "severity": random.choice(['Critical', 'High', 'Medium', 'Low']),
            "message": f"Alert message {i}",
            "timestamp": datetime.utcnow().isoformat() + 'Z',
            "platform": f"Platform {chr(65 + i % 3)}"
        }
        for i in range(1, 6)
    ]
    return jsonify(alerts)

@app.route('/api/reports', methods=['GET'])
def get_reports():
    reports = [
        {
            "clusterId": f"CLU-{str(i).zfill(3)}",
            "platform": f"Platform {chr(65 + i % 3)}",
            "riskScore": random.randint(40, 95),
            "confidence": random.randint(65, 95),
            "status": random.choice(['Active', 'Monitoring', 'Resolved'])
        }
        for i in range(1, 7)
    ]
    return jsonify(reports)

@app.route('/api/network', methods=['GET'])
def get_network():
    return jsonify({
        "nodes": [
            {"id": "node1", "type": "platform", "label": "Platform A", "riskLevel": "high"},
            {"id": "node2", "type": "cluster", "label": "CLU-001", "riskLevel": "high"},
            {"id": "node3", "type": "activity", "label": "Pattern", "riskLevel": "medium"}
        ],
        "edges": [
            {"source": "node1", "target": "node2", "weight": 0.85},
            {"source": "node2", "target": "node3", "weight": 0.72}
        ]
    })

@app.route('/api/trends', methods=['GET'])
def get_trends():
    trends = []
    platforms = ['Platform A', 'Platform B', 'Platform C']
    
    for i in range(30):
        date = (datetime.now() - timedelta(days=29-i)).strftime('%Y-%m-%d')
        for platform in platforms:
            trends.append({
                "date": date,
                "activities": random.randint(20, 120),
                "platform": platform
            })
    
    return jsonify(trends)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

---

## Security Considerations

### 1. Input Validation
- Sanitize all inputs
- Validate data types
- Check ranges (0-100 for scores)

### 2. SQL Injection Prevention
- Use parameterized queries
- ORM recommended (SQLAlchemy, Django ORM)

### 3. Authentication (Future)
```python
from functools import wraps
from flask import request

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token or not verify_token(token):
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/api/summary')
@require_auth
def get_summary():
    # ...
```

### 4. HTTPS in Production
- Use SSL/TLS certificates
- Redirect HTTP to HTTPS
- Set secure headers

---

## Performance Optimization

### 1. Database Indexing
```sql
CREATE INDEX idx_alerts_timestamp ON alerts(timestamp DESC);
CREATE INDEX idx_trends_date ON activity_trends(date);
```

### 2. Query Optimization
- Use LIMIT for large datasets
- Pagination for lists
- Aggregate queries efficiently

### 3. Caching
```python
from flask_caching import Cache

cache = Cache(app, config={'CACHE_TYPE': 'simple'})

@app.route('/api/summary')
@cache.cached(timeout=60)
def get_summary():
    # ...
```

---

## Deployment Checklist

- [ ] CORS configured correctly
- [ ] All endpoints tested
- [ ] Error handling implemented
- [ ] Database migrations applied
- [ ] Environment variables set
- [ ] Logging configured
- [ ] Rate limiting enabled
- [ ] HTTPS certificates installed
- [ ] Monitoring set up

---

**Last Updated:** February 2026  
**API Version:** 1.0.0  
**Base URL:** `http://localhost:5000/api`
