import { Layout } from '@/app/components/Layout';
import { Info, Shield, Eye, Users, Database, AlertTriangle, CheckCircle } from 'lucide-react';

export function AboutPage() {
  return (
    <Layout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Info className="w-8 h-8 text-red-600" />
            About & Ethics
          </h1>
          <p className="text-zinc-400">System overview, ethical guidelines, and privacy commitment</p>
        </div>

        {/* Main Disclaimer */}
        <div className="bg-gradient-to-r from-red-950/50 to-orange-950/50 border border-red-900/50 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-3 text-red-400">Mandatory Disclaimer</h2>
              <p className="text-white leading-relaxed">
                This system provides <span className="font-bold">AI-based decision support</span> using{' '}
                <span className="font-bold">publicly available and synthetic data only</span>.
                Final decisions are made by <span className="font-bold">authorized human analysts</span>.
                This is not an automated enforcement system.
              </p>
            </div>
          </div>
        </div>

        {/* Ethical Principles */}
        <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            Ethical Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <Database className="w-6 h-6 text-blue-500 mb-3" />
              <h3 className="font-semibold mb-2">Public Data Only</h3>
              <p className="text-sm text-zinc-400">
                All analysis is conducted using publicly available data and synthetic datasets.
                No private communications or personal data are accessed.
              </p>
            </div>

            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <Eye className="w-6 h-6 text-purple-500 mb-3" />
              <h3 className="font-semibold mb-2">No Identity Detection</h3>
              <p className="text-sm text-zinc-400">
                The system analyzes behavioral patterns and activities only. Individual identities
                are not tracked, stored, or targeted.
              </p>
            </div>

            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <Users className="w-6 h-6 text-yellow-500 mb-3" />
              <h3 className="font-semibold mb-2">Human-in-the-Loop</h3>
              <p className="text-sm text-zinc-400">
                All system outputs require human verification. Trained analysts review and validate
                all alerts before any action is taken.
              </p>
            </div>

            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <AlertTriangle className="w-6 h-6 text-red-500 mb-3" />
              <h3 className="font-semibold mb-2">Decision Support Only</h3>
              <p className="text-sm text-zinc-400">
                This system assists human decision-making. It does not make autonomous decisions
                or take automated enforcement actions.
              </p>
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">System Overview</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-red-400 mb-2">Purpose</h3>
              <p className="text-sm text-zinc-400">
                The AI-Based Cross-Platform Drug Trafficking Intelligence System is designed to
                assist law enforcement agencies in identifying suspicious behavioral patterns
                across multiple online platforms.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-red-400 mb-2">Methodology</h3>
              <p className="text-sm text-zinc-400">
                The system uses machine learning algorithms to analyze publicly available data,
                identifying clusters of suspicious activity based on behavioral patterns, temporal
                correlations, and cross-platform presence.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-red-400 mb-2">Data Sources</h3>
              <ul className="text-sm text-zinc-400 space-y-1 list-disc list-inside">
                <li>Publicly accessible social media posts</li>
                <li>Open-source intelligence (OSINT)</li>
                <li>Synthetic training datasets</li>
                <li>Aggregated behavioral metrics (no personal data)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Commitments */}
        <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Privacy Commitments</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-400">
                No collection of personally identifiable information (PII)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-400">
                No access to private messages or encrypted communications
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-400">
                Analysis focused on behavioral patterns, not individual identities
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-400">
                Compliance with data protection regulations and privacy laws
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-400">
                Regular audits and oversight by authorized personnel
              </p>
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Technical Stack</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm text-zinc-400 mb-2">Frontend</h3>
              <ul className="text-sm text-white space-y-1">
                <li>• React with TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Recharts for visualization</li>
                <li>• React Router</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-zinc-400 mb-2">Backend (Integrated)</h3>
              <ul className="text-sm text-white space-y-1">
                <li>• RESTful API endpoints</li>
                <li>• Machine Learning models</li>
                <li>• Pattern recognition algorithms</li>
                <li>• Data aggregation pipeline</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Project Information */}
        <div className="bg-black/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Project Information</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-zinc-400">Project Title:</span>{' '}
              <span className="text-white">AI-Based Cross-Platform Drug Trafficking Intelligence System</span>
            </p>
            <p>
              <span className="text-zinc-400">Version:</span>{' '}
              <span className="text-white">2.0.0</span>
            </p>
            <p>
              <span className="text-zinc-400">Purpose:</span>{' '}
              <span className="text-white">Final Year Engineering Major Project</span>
            </p>
            <p>
              <span className="text-zinc-400">Last Updated:</span>{' '}
              <span className="text-white">{new Date().toLocaleDateString()}</span>
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-4">
          <p className="text-sm text-blue-400">
            <span className="font-semibold">For Questions or Concerns:</span> This system is
            designed for educational and research purposes as part of a final-year engineering
            project. For ethical review or technical inquiries, please contact the project
            supervisor or institutional review board.
          </p>
        </div>
      </div>
    </Layout>
  );
}
