// src/components/UserPanel/Header.jsx
import { useUserStore } from '../../store/useUserStore';

export default function UserHeader() {
  const { user } = useUserStore();
  const userName = user?.name || "Rahul Sharma";
  const firstLetter = userName[0].toUpperCase();

  return (
    <>
      {/* Main Header - White (sirf content area) */}
      <div className="bg-white border-b border-gray-100 shadow-md sticky top-0 z-40 ml-20">
        <div className="px-6 py-4 flex justify-between items-center">
          {/* Left: Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back, <span className="font-semibold text-purple-600">{userName}</span>
            </p>
          </div>

          {/* Right: Clean RED Icon (NO GLOW) */}
          <div className="w-12 h-12 bg-primary-600
                          rounded-full flex items-center justify-center 
                          text-white font-bold text-2xl shadow-lg 
                          ring-4 ring-red-100">
            {firstLetter}
          </div>
        </div>
      </div>

    </>
  );
}