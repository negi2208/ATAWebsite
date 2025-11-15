// src/stores/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
  persist(
    (set, get) => ({
      // Default state
      user: null,
      admin: null,
      isAuthenticated: false,
      role: null,
      token: null,
      currentTime: "Loading...",
      country: "IN",

      // Login
      login: (data, role = "user") => {
        const token = data.token || `mock-${role}-${Date.now()}`;
        localStorage.setItem("token", token);
        set({
          [role === "admin" ? "admin" : "user"]: { ...data, role },
          isAuthenticated: true,
          role,
          token,
        });
      },

      // Logout
      logout: () => {
        localStorage.removeItem("token");
        set({
          user: null,
          admin: null,
          isAuthenticated: false,
          role: null,
          token: null,
        });
      },

      // Check Auth
      checkAuth: () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) return;

          const role = token.includes("admin") ? "admin" : "user";
          const mockData = {
            id: 1,
            name: role === "admin" ? "Admin" : "User",
            email: role === "admin" ? "admin@hashtaggroup.co.in" : "user@example.com",
            token,
          };

          set({
            [role]: { ...mockData, role },
            isAuthenticated: true,
            role,
            token,
          });
        } catch (err) {
          console.error("checkAuth error:", err);
        }
      },

      // Start Clock
      startClock: () => {
        const update = () => {
          try {
            const date = new Date();
            const time = date.toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            });
            set({ currentTime: time });
          } catch (err) {
            set({ currentTime: "Error" });
          }
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
      },
    }),
    {
      name: "auth-storage",
      skipHydration: true, // Prevents crash on SSR
    }
  )
);

export default authStore;