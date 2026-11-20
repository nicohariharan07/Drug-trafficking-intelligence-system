import { useEffect, useState } from 'react';
import { Layout } from '@/app/components/Layout';
import { fetchNetwork, NetworkData } from '@/app/utils/api';
import { Network, Info } from 'lucide-react';

export function NetworksPage() {
  const [networkData, setNetworkData] = useState<NetworkData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNetwork() {
      setLoading(true);
      const data = await fetchNetwork();
      setNetworkData(data);
      setLoading(false);
    }
    loadNetwork();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-400">Loading network visualization...</p>
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
            <Network className="w-8 h-8 text-red-600" />
            Network Analysis
          </h1>
          <p className="text-zinc-400">Behavioral correlation and pattern detection across platforms</p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-400 mb-2">Privacy & Ethics Statement</h3>
              <p className="text-sm text-blue-300">
                This visualization shows behavioral correlation patterns only. No personal identities
                are tracked or stored. All data is derived from publicly available sources and
                synthetic datasets. The system is designed for decision support, not automated enforcement.
              </p>
            </div>
          </div>
        </div>

        {/* Network Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-4">
            <div className="text-2xl font-bold">{networkData?.nodes.length || 0}</div>
            <div className="text-sm text-zinc-400">Behavioral Nodes</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-4">
            <div className="text-2xl font-bold">{networkData?.edges.length || 0}</div>
            <div className="text-sm text-zinc-400">Correlation Links</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-green-900/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-500">Active</div>
            <div className="text-sm text-zinc-400">Analysis Status</div>
          </div>
        </div>

        {/* Visualization Container */}
        <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-8">
          <div className="aspect-video bg-zinc-900/50 rounded-lg border border-zinc-800 flex items-center justify-center relative overflow-hidden">
            {/* Placeholder visualization */}
            <div className="absolute inset-0">
              {/* Grid background */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}></div>
              
              {/* Network nodes simulation */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-yellow-600 rounded-full animate-pulse delay-75"></div>
              <div className="absolute top-2/3 left-1/3 w-4 h-4 bg-green-600 rounded-full animate-pulse delay-150"></div>
              <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-100"></div>
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full">
                <line x1="25%" y1="25%" x2="50%" y2="33%" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" />
                <line x1="50%" y1="33%" x2="33%" y2="66%" stroke="rgba(234, 179, 8, 0.3)" strokeWidth="2" />
                <line x1="33%" y1="66%" x2="66%" y2="50%" stroke="rgba(22, 163, 74, 0.3)" strokeWidth="2" />
              </svg>
            </div>
            
            <div className="relative z-10 text-center">
              <Network className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-500 text-lg font-medium mb-2">
                Behavioral Correlation Visualization
              </p>
              <p className="text-zinc-600 text-sm max-w-md mx-auto">
                Network graph visualization connects behavioral patterns across platforms.
                No identity tracking is performed - analysis is based on activity clusters only.
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Network Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-sm text-zinc-400">High Risk Pattern</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              <span className="text-sm text-zinc-400">Medium Risk Pattern</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="text-sm text-zinc-400">Low Risk Pattern</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-zinc-400">Platform Node</span>
            </div>
          </div>
        </div>

        {/* Technical Note */}
        <div className="bg-yellow-950/20 border border-yellow-900/30 rounded-xl p-4">
          <p className="text-sm text-yellow-400">
            <span className="font-semibold">Integration Note:</span> Connect your network
            visualization library here. The backend provides node and edge data via{' '}
            <code className="bg-black/50 px-2 py-1 rounded">GET /api/network</code>
          </p>
        </div>
      </div>
    </Layout>
  );
}
