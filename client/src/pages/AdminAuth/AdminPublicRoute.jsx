import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const AdminPublicRoute = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Navigate to="/admin" replace /> : <Outlet />;
};

export default AdminPublicRoute;