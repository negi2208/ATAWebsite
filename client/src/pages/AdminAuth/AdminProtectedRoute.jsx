// src/routes/AdminProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const AdminProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const isHydrated = useAuthStore.persist.hasHydrated();

  if (!isHydrated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};


export default AdminProtectedRoute;