import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Network, Bell, TrendingUp, Info, LogOut, Shield } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Networks', href: '/networks', icon: Network },
    { name: 'Alerts', href: '/alerts', icon: Bell },
    { name: 'Trends', href: '/trends', icon: TrendingUp },
    { name: 'About', href: '/about', icon: Info },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-red-900/30">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-600" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">DRUG COMMISSION</h1>
              <p className="text-xs text-zinc-400">Intelligence System v2.0</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-950/50 hover:bg-red-950 border border-red-900/50 rounded-md transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-black/40 backdrop-blur-xl border-r border-zinc-800/50 overflow-y-auto">
        <div className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-red-950/50 border border-red-900/50 text-white'
                    : 'hover:bg-zinc-900/50 text-zinc-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer in Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800/50">
          <div className="text-xs text-zinc-500 space-y-1">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              All activities monitored
            </p>
            <p className="text-[10px] text-zinc-600">Authorized Government Use Only</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 mt-16 p-8">
        {children}
      </main>
    </div>
  );
}
