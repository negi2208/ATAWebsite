// src/routes/AdminProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import {useAuthStore} from "../../store/authStore";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AdminProtectedRoute = () => {
  const { isAuthenticated, role } = useAuthStore();
  const isHydrated = useAuthStore.persist.hasHydrated();

  // Loading state while hydration
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  const isAdmin = isAuthenticated && role === "admin";

  useEffect(() => {
    if (isHydrated && !isAdmin) {
      toast.error("Access denied. Admin login required.");
    }
  }, [isHydrated, isAdmin]);

  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;