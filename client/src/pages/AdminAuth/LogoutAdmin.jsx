import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";

export const logoutAdminAPI = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/admin/logout`
  );
  return res.data;
};

const LogoutAdmin = () => {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutAdminAPI(); // optional but clean
    } catch (_) {
      // ignore API error
    } finally {
      logout();
      localStorage.removeItem("admin-auth");
      toast.success("Logged out successfully!");
      window.location.replace("/admin/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
    >
      Logout
    </button>
  );
};

export default LogoutAdmin;
