// API utility functions for backend integration

const BASE_URL = "http://127.0.0.1:8000/api";

/* =======================
   TYPES / INTERFACES
======================= */

export interface SummaryData {
  totalFlagged: number;
  highRisk: number;
  mediumRisk: number;
  platformsMonitored: number;
  riskDistribution: {
    high: number;
    medium: number;
    low: number;
  };
}

export interface Alert {
  id: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  message: string;
  timestamp: string;
  platform: string;
}

export interface Report {
  clusterId: string;
  platform: string;
  riskScore: number;
  confidence: number;
  status: "Active" | "Monitoring" | "Resolved";
}

export interface NetworkData {
  nodes: Array<{ id: string; type: string }>;
  edges: Array<{ source: string; target: string }>;
}

export interface TrendData {
  date: string;
  activities: number;
  platform: string;
}

/* =======================
   ML PREDICTION
======================= */

export interface PredictionResponse {
  probability: number;
  risk_level: "LOW" | "MEDIUM" | "HIGH";
}

export async function predictText(text: string): Promise<PredictionResponse> {
  const response = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
}

/* =======================
   DASHBOARD APIs
======================= */

export async function fetchSummary(): Promise<SummaryData> {
  try {
    const response = await fetch(`${BASE_URL}/summary`);
    if (!response.ok) throw new Error("Failed to fetch summary");
    return await response.json();
  } catch (error) {
    console.error("Error fetching summary:", error);
    return {
      totalFlagged: 1247,
      highRisk: 89,
      mediumRisk: 234,
      platformsMonitored: 12,
      riskDistribution: {
        high: 89,
        medium: 234,
        low: 924,
      },
    };
  }
}

export async function fetchAlerts(): Promise<Alert[]> {
  try {
    const response = await fetch(`${BASE_URL}/alerts`);
    if (!response.ok) throw new Error("Failed to fetch alerts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return [
      {
        id: "ALT-001",
        severity: "Critical",
        message: "Suspicious behavioral pattern detected across multiple platforms",
        timestamp: new Date().toISOString(),
        platform: "Platform A",
      },
      {
        id: "ALT-002",
        severity: "High",
        message: "Coordinated activity cluster identified",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        platform: "Platform B",
      },
      {
        id: "ALT-003",
        severity: "Medium",
        message: "Increased activity in monitored region",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        platform: "Platform C",
      },
    ];
  }
}

export async function fetchReports(): Promise<Report[]> {
  try {
    const response = await fetch(`${BASE_URL}/reports`);
    if (!response.ok) throw new Error("Failed to fetch reports");
    return await response.json();
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [
      { clusterId: "CLU-001", platform: "Platform A", riskScore: 92, confidence: 88, status: "Active" },
      { clusterId: "CLU-002", platform: "Platform B", riskScore: 87, confidence: 91, status: "Monitoring" },
      { clusterId: "CLU-003", platform: "Platform C", riskScore: 78, confidence: 85, status: "Active" },
    ];
  }
}

export async function fetchNetwork(): Promise<NetworkData> {
  try {
    const response = await fetch(`${BASE_URL}/network`);
    if (!response.ok) throw new Error("Failed to fetch network");
    return await response.json();
  } catch (error) {
    console.error("Error fetching network:", error);
    return {
      nodes: [
        { id: "node1", type: "platform" },
        { id: "node2", type: "cluster" },
        { id: "node3", type: "activity" },
      ],
      edges: [
        { source: "node1", target: "node2" },
        { source: "node2", target: "node3" },
      ],
    };
  }
}

export async function fetchTrends(): Promise<TrendData[]> {
  try {
    const response = await fetch(`${BASE_URL}/trends`);
    if (!response.ok) throw new Error("Failed to fetch trends");
    return await response.json();
  } catch (error) {
    console.error("Error fetching trends:", error);
    const mockData: TrendData[] = [];
    const platforms = ["Platform A", "Platform B", "Platform C"];

    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      platforms.forEach((platform) => {
        mockData.push({
          date: date.toISOString().split("T")[0],
          activities: Math.floor(Math.random() * 100) + 20,
          platform,
        });
      });
    }
    return mockData;
  }
}
