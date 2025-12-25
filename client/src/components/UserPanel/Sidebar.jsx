// src/components/UserPanel/UserSidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, User, Heart, MessageCircle, 
  Star, ShoppingBag, LogOut
} from 'lucide-react';

const Logo = "/images/Logo/ATA-LOGO[1]1[1].png";

export default function UserSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/user/dashboard" },
    { icon: Package, label: "Orders", path: "/user/orders" },
    { icon: ShoppingBag, label: "Track Orders", path: "/user/track" },
    { icon: User, label: "Profile", path: "/user/profile" },
    { icon: Heart, label: "Wishlist", path: "/user/wishlist" },
    { icon: MessageCircle, label: "Support", path: "/user/support" },
    { icon: Star, label: "Reviews", path: "/user/reviews" },
  ];

  // Redirect to /logout page
  const handleLogoutClick = () => {
    navigate('/my-account');
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-20 bg-black border-r border-gray-800 flex flex-col items-center py-2">
      
      {/* Logo */}
      <div className="mb-10">
        <img 
          src={Logo} 
          alt="ATA Logo" 
          className="w-auto h-21 object-contain rounded-xl shadow-2xl p-2"
        />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-4 w-full px-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => 
              `relative group flex items-center justify-center w-full py-3 rounded-2xl transition-all duration-300
              ${isActive 
                ? 'bg-white text-black shadow-2xl shadow-red-900/50 scale-110' 
                : 'text-gray-500 hover:bg-gray-900/80 hover:text-white hover:scale-105'
              }`
            }
          >
            <item.icon size={19} className="shrink-0" />

            {/* Tooltip - SAME FOR ALL */}
            <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 
                            transition-all duration-300 pointer-events-none z-50">
              <div className="relative bg-gray-900 text-white text-sm font-medium 
                               px-4 py-2.5 rounded-xl shadow-2xl border border-gray-700">
                {item.label}
                <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 
                                 w-0 h-0 border-t-8 border-b-8 border-r-8 
                                 border-t-transparent border-b-transparent 
                                 border-r-gray-900"></div>
              </div>
            </div>
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT BUTTON → REDIRECT TO /logout */}
      <div className="mt-auto px-3 w-full pb-4">
        <button
          onClick={handleLogoutClick}
          className="relative group flex items-center justify-center w-full py-3 
                     bg-red-600 hover:bg-red-700 rounded-2xl transition-all duration-300 
                     shadow-2xl shadow-red-900/60 hover:scale-105 text-white"
        >
          <LogOut size={19} className="shrink-0" />

          {/* SAME TOOLTIP AS OTHERS */}
          <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 
                          transition-all duration-300 pointer-events-none z-50">
            <div className="relative bg-gray-900 text-white text-sm font-medium 
                             px-4 py-2.5 rounded-xl shadow-2xl border border-gray-700">
              Logout
              <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 
                               w-0 h-0 border-t-8 border-b-8 border-r-8 
                               border-t-transparent border-b-transparent 
                               border-r-gray-900"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}