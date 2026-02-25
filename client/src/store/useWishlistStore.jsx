// src/store/useWishlistStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],

      addToWishlist: (product) =>
        set((state) => {
          if (!state.wishlist.find(p => p.id === product.id)) {
            return { wishlist: [...state.wishlist, { ...product, addedDate: new Date().toLocaleDateString() }] };
          }
          return state;
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter(p => p.id !== id)
        })),

      clearWishlist: () => set({ wishlist: [] }),
    }),
    { name: 'wishlist-storage' }
  )
);