// src/store/useCartStore.js
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, { ...product, quantity: 1 }]
    })),
}));