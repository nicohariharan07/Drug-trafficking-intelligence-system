import { useEffect, useState } from 'react';
import { Layout } from '@/app/components/Layout';
import { fetchTrends, TrendData } from '@/app/utils/api';
import { TrendingUp, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

export function TrendsPage() {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'line' | 'area'>('line');

  useEffect(() => {
    async function loadTrends() {
      setLoading(true);
      const data = await fetchTrends();
      setTrends(data);
      setLoading(false);
    }
    loadTrends();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-400">Loading trends data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Aggregate data by date for overall trends
  const aggregatedData = trends.reduce((acc: any[], curr) => {
    const existing = acc.find(item => item.date === curr.date);
    if (existing) {
      existing[curr.platform] = curr.activities;
    } else {
      acc.push({
        date: curr.date,
        [curr.platform]: curr.activities,
      });
    }
    return acc;
  }, []);

  // Get unique platforms
  const platforms = Array.from(new Set(trends.map(t => t.platform)));
  const platformColors = {
    'Platform A': '#dc2626',
    'Platform B': '#ea580c',
    'Platform C': '#ca8a04',
  };

  // Calculate statistics
  const totalActivities = trends.reduce((sum, t) => sum + t.activities, 0);
  const avgActivities = Math.round(totalActivities / aggregatedData.length);
  const maxActivities = Math.max(...trends.map(t => t.activities));

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-red-600" />
              Activity Trends
            </h1>
            <p className="text-zinc-400">Temporal analysis of flagged activities across platforms</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('line')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                viewMode === 'line'
                  ? 'bg-red-950 border border-red-900 text-white'
                  : 'bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              Line Chart
            </button>
            <button
              onClick={() => setViewMode('area')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                viewMode === 'area'
                  ? 'bg-red-950 border border-red-900 text-white'
                  : 'bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              Area Chart
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-red-500" />
              <span className="text-sm text-zinc-400">Total Activities</span>
            </div>
            <div className="text-2xl font-bold">{totalActivities.toLocaleString()}</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-zinc-400">Daily Average</span>
            </div>
            <div className="text-2xl font-bold">{avgActivities.toLocaleString()}</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-green-500" />
              <span className="text-sm text-zinc-400">Peak Activity</span>
            </div>
            <div className="text-2xl font-bold">{maxActivities.toLocaleString()}</div>
          </div>
        </div>

        {/* Activity Over Time Chart */}
        <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Activity Trends Over Time</h2>
          <ResponsiveContainer width="100%" height={400}>
            {viewMode === 'line' ? (
              <LineChart data={aggregatedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="#71717a"
                  tick={{ fill: '#71717a' }}
                />
                <YAxis 
                  stroke="#71717a"
                  tick={{ fill: '#71717a' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                {platforms.map((platform) => (
                  <Line
                    key={platform}
                    type="monotone"
                    dataKey={platform}
                    stroke={platformColors[platform as keyof typeof platformColors]}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            ) : (
              <AreaChart data={aggregatedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="#71717a"
                  tick={{ fill: '#71717a' }}
                />
                <YAxis 
                  stroke="#71717a"
                  tick={{ fill: '#71717a' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                {platforms.map((platform) => (
                  <Area
                    key={platform}
                    type="monotone"
                    dataKey={platform}
                    stroke={platformColors[platform as keyof typeof platformColors]}
                    fill={platformColors[platform as keyof typeof platformColors]}
                    fillOpacity={0.6}
                  />
                ))}
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Platform Migration Analysis */}
        <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Platform Distribution</h2>
          <div className="space-y-4">
            {platforms.map((platform) => {
              const platformTotal = trends
                .filter(t => t.platform === platform)
                .reduce((sum, t) => sum + t.activities, 0);
              const percentage = ((platformTotal / totalActivities) * 100).toFixed(1);
              
              return (
                <div key={platform}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{platform}</span>
                    <span className="text-sm text-zinc-400">
                      {platformTotal.toLocaleString()} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: platformColors[platform as keyof typeof platformColors],
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-4">
          <p className="text-sm text-blue-400">
            <span className="font-semibold">Trend Analysis:</span> These visualizations show temporal
            patterns in flagged activities. Spikes may indicate coordinated campaigns or platform
            migration. All data is derived from behavioral analysis, not identity tracking.
          </p>
        </div>
      </div>
    </Layout>
  );
}
