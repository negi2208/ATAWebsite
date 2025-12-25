// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

const cookieStorage = {
  getItem: (name) => Cookies.get(name) || null,
  setItem: (name, value) => {
    Cookies.set(name, value, {
      expires: 7,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  },
  removeItem: (name) => Cookies.remove(name, { path: "/" }),
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      admin: null,
      token: null,
      role: null, // "user" | "admin" | null
      isAuthenticated: false,
      lastActivity: Date.now(),

      login: (data, token, role = "user") => {
        Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true, sameSite: "strict" });
        set({
          token,
          role,
          isAuthenticated: true,
          lastActivity: Date.now(),
          user: role === "user" ? data : null,
          admin: role === "admin" ? data : null,
        });
      },

      logout: () => {
        Cookies.remove(TOKEN_KEY);
        set({
          user: null,
          admin: null,
          token: null,
          role: null,
          isAuthenticated: false,
          lastActivity: null,
        });
      },

      updateActivity: () => {
        if (get().isAuthenticated) {
          set({ lastActivity: Date.now() });
        }
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => cookieStorage,
      partialize: (state) => ({
        token: state.token,
        role: state.role,
        user: state.user,
        admin: state.admin,
      }),
    }
  )
);

