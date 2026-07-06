import { useEffect, useState, useCallback } from "react";

export const CART_UPDATE_EVENT = "fb-cart-update";

export const notifyCartUpdate = () => {
  window.dispatchEvent(new Event(CART_UPDATE_EVENT));
};

const readCount = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.reduce((sum, item) => sum + (item.count || 1), 0);
  } catch {
    return 0;
  }
};

export const useCartCount = () => {
  const [count, setCount] = useState(readCount);

  const refresh = useCallback(() => setCount(readCount()), []);

  useEffect(() => {
    refresh();
    window.addEventListener(CART_UPDATE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(CART_UPDATE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [refresh]);

  return count;
};
