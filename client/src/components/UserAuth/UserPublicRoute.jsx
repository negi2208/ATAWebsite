import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const UserPublicRoute = () => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) return null;

  return isAuthenticated ? <Navigate to="/user" replace /> : <Outlet />;
};

export default UserPublicRoute;