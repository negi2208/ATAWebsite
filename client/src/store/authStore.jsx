// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware"; // Remember user after refresh

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      // LOGIN
      login: (userData) => {
        set({ user: userData, isLoggedIn: true });
      },

      // LOGOUT
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },

      // UPDATE PROFILE (optional)
      updateProfile: (updatedData) => {
        set((state) => ({
          user: { ...state.user, ...updatedData },
        }));
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);

export default useAuthStore;