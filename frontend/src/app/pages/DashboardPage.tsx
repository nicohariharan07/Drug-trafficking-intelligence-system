import { useEffect, useState } from 'react';
import { Layout } from '@/app/components/Layout';
import {
  fetchSummary,
  fetchAlerts,
  predictText,
  SummaryData,
  Alert,
  PredictionResponse,
} from '@/app/utils/api';

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Globe,
  TrendingUp,
} from 'lucide-react';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

export function DashboardPage() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  // ML states
  const [inputText, setInputText] = useState('');
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [summaryData, alertsData] = await Promise.all([
        fetchSummary(),
        fetchAlerts(),
      ]);
      setSummary(summaryData);
      setAlerts(alertsData.slice(0, 5));
      setLoading(false);
    }
    loadData();
  }, []);

  async function handleAnalyze() {
    if (!inputText.trim()) return;

    setPredicting(true);
    try {
      const result = await predictText(inputText);
      setPrediction(result);
    } catch (error) {
      console.error(error);
      alert('Prediction failed');
    } finally {
      setPredicting(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-400">Loading intelligence data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const riskDistributionData = summary
    ? [
        { name: 'High Risk', value: summary.riskDistribution.high, color: '#991b1b' },
        { name: 'Medium Risk', value: summary.riskDistribution.medium, color: '#a16207' },
        { name: 'Low Risk', value: summary.riskDistribution.low, color: '#166534' },
      ]
    : [];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-950/50 border-red-900 text-red-400';
      case 'High':
        return 'bg-orange-950/50 border-orange-900 text-orange-400';
      case 'Medium':
        return 'bg-yellow-950/50 border-yellow-900 text-yellow-400';
      default:
        return 'bg-green-950/50 border-green-900 text-green-400';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Intelligence Dashboard</h1>
          <p className="text-zinc-400">
            Real-time monitoring and ML-based risk analysis
          </p>
        </div>

        {/* ML Analysis Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Analyze Message (Machine Learning)</h2>

          <textarea
            className="w-full bg-black border border-zinc-700 rounded-lg p-3 mb-4"
            rows={4}
            placeholder="Enter message to analyze..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            onClick={handleAnalyze}
            disabled={predicting}
            className="px-4 py-2 bg-red-900 hover:bg-red-800 disabled:opacity-50 rounded"
          >
            {predicting ? 'Analyzing...' : 'Analyze'}
          </button>

          {prediction && (
            <div className="mt-4 border border-zinc-700 rounded-lg p-4">
              <p>
                <span className="font-semibold">Risk Level:</span>{' '}
                <span
                  className={
                    prediction.risk_level === 'HIGH'
                      ? 'text-red-500'
                      : prediction.risk_level === 'MEDIUM'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }
                >
                  {prediction.risk_level}
                </span>
              </p>
              <p>
                <span className="font-semibold">Probability:</span>{' '}
                {(prediction.probability * 100).toFixed(2)}%
              </p>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-black/40 border border-zinc-800 rounded-xl p-6">
            <Activity className="w-8 h-8 text-zinc-400 mb-4" />
            <div className="text-3xl font-bold">{summary?.totalFlagged}</div>
            <div className="text-sm text-zinc-400">Total Flagged</div>
          </div>

          <div className="bg-black/40 border border-red-900/40 rounded-xl p-6">
            <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
            <div className="text-3xl font-bold text-red-500">{summary?.highRisk}</div>
            <div className="text-sm text-zinc-400">High Risk</div>
          </div>

          <div className="bg-black/40 border border-yellow-900/40 rounded-xl p-6">
            <BarChart3 className="w-8 h-8 text-yellow-500 mb-4" />
            <div className="text-3xl font-bold text-yellow-500">{summary?.mediumRisk}</div>
            <div className="text-sm text-zinc-400">Medium Risk</div>
          </div>

          <div className="bg-black/40 border border-zinc-800 rounded-xl p-6">
            <Globe className="w-8 h-8 text-blue-400 mb-4" />
            <div className="text-3xl font-bold">{summary?.platformsMonitored}</div>
            <div className="text-sm text-zinc-400">Platforms</div>
          </div>
        </div>

        {/* Chart + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-black/40 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Risk Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={riskDistributionData} dataKey="value" outerRadius={100}>
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-black/40 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 border rounded-lg ${getSeverityColor(alert.severity)}`}
                >
                  <p className="text-sm mb-1">{alert.message}</p>
                  <p className="text-xs text-zinc-500">{alert.platform}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}

