"use client";

export const STORAGE_KEY = "elitaliano_cart";

export type CartItem = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  qty: number;
};

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch { return []; }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart:update"));
}

export function addToCart(item: CartItem) {
  const cart = loadCart();
  const found = cart.find(x => x.id === item.id);
  const updated = found
    ? cart.map(x => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x))
    : [...cart, { ...item, qty: 1 }];
  saveCart(updated);
}
