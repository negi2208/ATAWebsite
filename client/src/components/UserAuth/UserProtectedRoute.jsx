// src/routes/UserProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import {useAuthStore} from "../../store/authStore";

const UserProtectedRoute = () => {
  const { isAuthenticated, role } = useAuthStore();
  const isHydrated = useAuthStore.persist.hasHydrated();

  // Show loader until hydration complete
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-pink-600"></div>
      </div>
    );
  }

  const isUser = isAuthenticated && role === "user";

  return isUser ? <Outlet /> : <Navigate to="/my-account" replace />;
};

export default UserProtectedRoute;