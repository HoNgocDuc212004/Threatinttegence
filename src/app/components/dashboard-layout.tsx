import { Outlet, NavLink, useNavigate } from "react-router";
import { Shield, LayoutDashboard, Map, BarChart3, AlertTriangle, Activity, Rss, Settings, LogOut } from "lucide-react";
import { useAuth } from "../context/auth-context";

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Tổng quan", end: true },
    { to: "/map", icon: Map, label: "Bản đồ" },
    { to: "/analytics", icon: BarChart3, label: "Phân tích" },
    { to: "/threats", icon: AlertTriangle, label: "Mối đe dọa" },
    { to: "/activity", icon: Activity, label: "Hoạt động" },
    { to: "/feeds", icon: Rss, label: "Nguồn dữ liệu" },
    { to: "/settings", icon: Settings, label: "Cài đặt" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">ThreatShield</h1>
              <p className="text-xs text-gray-600">Intelligence Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">System Active</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hệ thống giám sát bảo mật</p>
              <p className="text-xs text-gray-500 mt-0.5">Cập nhật lần cuối: Vừa xong</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <p className="text-sm font-medium text-gray-900">{user?.email || 'User'}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    user?.role === 'admin'
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {user?.role === 'admin' ? 'Admin' : 'User'}
                  </span>
                </div>
                {user?.phone && <p className="text-xs text-gray-500">{user.phone}</p>}
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">{user?.email?.[0].toUpperCase() || 'U'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}