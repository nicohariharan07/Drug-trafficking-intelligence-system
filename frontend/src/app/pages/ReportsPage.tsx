import { useEffect, useState } from 'react';
import { Layout } from '@/app/components/Layout';
import { fetchReports, Report } from '@/app/utils/api';
import { FileText, Download } from 'lucide-react';

export function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      setLoading(true);
      const data = await fetchReports();
      setReports(data);
      setLoading(false);
    }
    loadReports();
  }, []);

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-500 bg-red-950/50 border-red-900';
    if (score >= 60) return 'text-yellow-500 bg-yellow-950/50 border-yellow-900';
    return 'text-green-500 bg-green-950/50 border-green-900';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-red-500 bg-red-950/50 border-red-900';
      case 'Monitoring':
        return 'text-yellow-500 bg-yellow-950/50 border-yellow-900';
      case 'Resolved':
        return 'text-green-500 bg-green-950/50 border-green-900';
      default:
        return 'text-zinc-500 bg-zinc-950/50 border-zinc-900';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-400">Loading reports...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <FileText className="w-8 h-8 text-red-600" />
              Intelligence Reports
            </h1>
            <p className="text-zinc-400">Detailed analysis of flagged clusters and activities</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-950/50 hover:bg-red-950 border border-red-900/50 rounded-lg transition-all duration-200">
            <Download className="w-4 h-4" />
            Export Reports
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-4">
            <div className="text-2xl font-bold">{reports.length}</div>
            <div className="text-sm text-zinc-400">Total Reports</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-red-900/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-red-500">
              {reports.filter((r) => r.status === 'Active').length}
            </div>
            <div className="text-sm text-zinc-400">Active Cases</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-yellow-900/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-yellow-500">
              {reports.filter((r) => r.status === 'Monitoring').length}
            </div>
            <div className="text-sm text-zinc-400">Under Monitoring</div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-900/50 border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Cluster ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Platform</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Risk Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Confidence</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {reports.map((report) => (
                  <tr
                    key={report.clusterId}
                    className="hover:bg-zinc-900/30 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-semibold text-white">
                        {report.clusterId}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-300">{report.platform}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold border ${getRiskColor(
                          report.riskScore
                        )}`}
                      >
                        {report.riskScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-300">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600"
                            style={{ width: `${report.confidence}%` }}
                          ></div>
                        </div>
                        <span>{report.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold border ${getStatusColor(
                          report.status
                        )}`}
                      >
                        {report.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm text-red-500 hover:text-red-400 font-medium transition-colors">
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note */}
        <div className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-4">
          <p className="text-sm text-blue-400">
            <span className="font-semibold">Note:</span> All reports are generated using AI-based
            behavioral analysis of publicly available data. Human verification is required before
            taking action.
          </p>
        </div>
      </div>
    </Layout>
  );
}
