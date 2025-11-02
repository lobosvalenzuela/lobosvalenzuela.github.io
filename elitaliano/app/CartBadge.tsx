"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "elitaliano_cart";

function getQty(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const items = raw ? (JSON.parse(raw) as { qty: number }[]) : [];
    return items.reduce((a, i) => a + (i.qty || 0), 0);
  } catch { return 0; }
}

export default function CartBadge({ withId = false }: { withId?: boolean }) {
  const [qty, setQty] = useState(0);

  useEffect(() => {
    setQty(getQty());
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) setQty(getQty()); };
    const onUpdate = () => setQty(getQty());
    window.addEventListener("storage", onStorage);
    window.addEventListener("cart:update", onUpdate as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart:update", onUpdate as EventListener);
    };
  }, []);

  return <span id={withId ? "icon-cart-quantity" : undefined}>{qty}</span>;
}
