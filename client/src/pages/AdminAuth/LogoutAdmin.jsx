// src/components/admin/LogoutAdmin.jsx
import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useAuthStore} from "../../store/authStore"; // ← DEFAULT IMPORT (yeh sahi hai)

export const logoutAdminAPI = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL}/api/admin/auth/logout`,
      {},
      { withCredentials: true }
    );

    const { success, message } = res.data;
    console.log("Logout response:", res.data);
    return { success, message };
  } catch (error) {
    console.error("Logout API failed:", error);
    return { success: false, message: "Logout failed. Please try again." };
  }
};

const LogoutAdmin = () => {
  // Zustand store se values le rahe hain
  const {
    logout,
    lastActivity,
    updateActivity,
    isAuthenticated,
  } = useAuthStore(); // ← bilkul sahi use

  const handleLogout = async () => {
    try {
      const { success, message } = await logoutAdminAPI();

      if (success) {
        logout(); // Zustand state clear
        localStorage.removeItem("admin-store"); // Persist clear
        toast.success(message || "Logged out successfully!");
        window.location.replace("/admin/login"); // Full redirect
      } else {
        toast.error(message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong!");
    }
  };

  // Auto logout after 30 minutes of inactivity
  useEffect(() => {
    if (!isAuthenticated) return;

    const activityHandler = () => updateActivity();

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, activityHandler));

    const interval = setInterval(() => {
      const inactiveTime = Date.now() - lastActivity;
      if (inactiveTime > 30 * 60 * 1000) {
        toast.error("Session expired due to inactivity!");
        handleLogout();
      }
    }, 60 * 1000);

    return () => {
      clearInterval(interval);
      events.forEach((event) =>
        window.removeEventListener(event, activityHandler)
      );
    };
  }, [isAuthenticated, lastActivity, updateActivity]);

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center gap-3"
    >
      Logout
    </button>
  );
};

export default LogoutAdmin;