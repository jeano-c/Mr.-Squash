import { createContext, useContext } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  desc?: string;
}

export interface CartItem extends MenuItem {
  qty: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
  cartCount: number;
  cartTotal: number;
  clearCart: () => void;
}
// ─────────────────────────────────────────────────────────────────────────────

// 1. Export the context itself
export const CartContext = createContext<CartContextType | null>(null);

// 2. Export the hook
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
