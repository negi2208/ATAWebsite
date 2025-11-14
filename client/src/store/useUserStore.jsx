// src/stores/useUserStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // For localStorage persistence

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      sidebarOpen: true,

      // Login (Auto-fill for demo + real login)
      login: (userData) =>
        set({
          user: {
            name: userData?.name || "Rahul Sharma",
            email: userData?.email || "rahul@example.com",
            phone: userData?.phone || "+91 98765 43210",
            address: userData?.address || "123, Green Valley, Sector 42, Gurgaon, Haryana - 122001",
            photo: userData?.photo || null,
            totalOrders: userData?.totalOrders || 156,
            pendingOrders: userData?.pendingOrders || 3,
            wishlistItems: userData?.wishlistItems || 8,
            supportTickets: userData?.supportTickets || 2,
          },
        }),

      // Update Profile (Edit → Save)
      updateProfile: (updatedFields) =>
        set((state) => ({
          user: {
            ...state.user,
            ...updatedFields,
          },
        })),

      // Toggle Sidebar
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Logout
      logout: () => set({ user: null, sidebarOpen: true }),
    }),
    {
      name: 'user-storage', // Saves to localStorage
    }
  )
);