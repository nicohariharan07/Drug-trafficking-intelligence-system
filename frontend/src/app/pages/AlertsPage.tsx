import { useEffect, useState } from 'react';
import { Layout } from '@/app/components/Layout';
import { fetchAlerts, Alert } from '@/app/utils/api';
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

export function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    async function loadAlerts() {
      setLoading(true);
      const data = await fetchAlerts();
      setAlerts(data);
      setLoading(false);
    }
    loadAlerts();
  }, []);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'High':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'Medium':
        return <Info className="w-5 h-5 text-yellow-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-950/50 border-red-900 hover:border-red-800';
      case 'High':
        return 'bg-orange-950/50 border-orange-900 hover:border-orange-800';
      case 'Medium':
        return 'bg-yellow-950/50 border-yellow-900 hover:border-yellow-800';
      default:
        return 'bg-green-950/50 border-green-900 hover:border-green-800';
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-600 text-white';
      case 'High':
        return 'bg-orange-600 text-white';
      case 'Medium':
        return 'bg-yellow-600 text-black';
      default:
        return 'bg-green-600 text-white';
    }
  };

  const filteredAlerts = filter === 'All' 
    ? alerts 
    : alerts.filter(alert => alert.severity === filter);

  const severityCounts = {
    Critical: alerts.filter(a => a.severity === 'Critical').length,
    High: alerts.filter(a => a.severity === 'High').length,
    Medium: alerts.filter(a => a.severity === 'Medium').length,
    Low: alerts.filter(a => a.severity === 'Low').length,
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-400">Loading alerts...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Bell className="w-8 h-8 text-red-600" />
            Security Alerts
          </h1>
          <p className="text-zinc-400">Real-time notifications of suspicious activities and patterns</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-950/30 backdrop-blur-xl border border-red-900/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-red-500">{severityCounts.Critical}</div>
            <div className="text-sm text-zinc-400">Critical Alerts</div>
          </div>
          <div className="bg-orange-950/30 backdrop-blur-xl border border-orange-900/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-orange-500">{severityCounts.High}</div>
            <div className="text-sm text-zinc-400">High Priority</div>
          </div>
          <div className="bg-yellow-950/30 backdrop-blur-xl border border-yellow-900/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-yellow-500">{severityCounts.Medium}</div>
            <div className="text-sm text-zinc-400">Medium Priority</div>
          </div>
          <div className="bg-green-950/30 backdrop-blur-xl border border-green-900/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-500">{severityCounts.Low}</div>
            <div className="text-sm text-zinc-400">Low Priority</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {['All', 'Critical', 'High', 'Medium', 'Low'].map((severity) => (
            <button
              key={severity}
              onClick={() => setFilter(severity)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === severity
                  ? 'bg-red-950 border border-red-900 text-white'
                  : 'bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {severity}
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-12 text-center">
              <Bell className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400">No alerts found for this filter</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-black/40 backdrop-blur-xl border rounded-xl p-6 transition-all duration-200 ${getSeverityColor(
                  alert.severity
                )}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(alert.severity)}
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-bold ${getSeverityBadgeColor(
                        alert.severity
                      )}`}
                    >
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="text-sm font-mono text-zinc-500">{alert.id}</span>
                  </div>
                  <div className="text-sm text-zinc-500">
                    {new Date(alert.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                <p className="text-white mb-3">{alert.message}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <span>Platform: <span className="text-white">{alert.platform}</span></span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-sm transition-colors">
                      Investigate
                    </button>
                    <button className="px-3 py-1 bg-red-950 hover:bg-red-900 border border-red-900 rounded text-sm transition-colors">
                      Escalate
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-4">
          <p className="text-sm text-blue-400">
            <span className="font-semibold">Alert System:</span> Alerts are generated in real-time
            based on AI pattern recognition. All alerts require human review and verification before
            any action is taken.
          </p>
        </div>
      </div>
    </Layout>
  );
}
