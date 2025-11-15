// src/components/Admin/AdminSidebar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Package, ShoppingCart, 
  CreditCard, MessageSquare, LogOut
} from 'lucide-react';
import useAdminStore from '../../store/useAdminStore';

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Users Management", path: "/admin/users" },
  { icon: Package, label: "Products Management", path: "/admin/products" },
  { icon: ShoppingCart, label: "Orders Management", path: "/admin/orders" },
  { icon: CreditCard, label: "Payments", path: "/admin/payments" },
  { icon: MessageSquare, label: "Reviews", path: "/admin/reviews" },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Zustand Store
  const { user, logout } = useAdminStore();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="w-64 bg-black text-white flex flex-col h-screen">

      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold">Admin Panel</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-orange-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-gray-900 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info + Logout */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div>
              <p className="font-medium text-sm">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-400">{user?.email || 'admin@ata.com'}</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}