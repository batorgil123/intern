import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Custom hook for cart management
import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const updateCart = () => {
    const savedItems = localStorage.getItem("cartItems");
    if (savedItems) {
      const items = JSON.parse(savedItems);
      setCartItems(items);
      const totalCount = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(totalCount);
    } else {
      setCartItems([]);
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCart();

    // Listen for storage changes
    const handleStorageChange = () => {
      updateCart();
    };

    // Listen for custom cart update events
    const handleCartUpdate = () => {
      updateCart();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const addToCart = (item: any) => {
    const existingItems = localStorage.getItem("cartItems");
    let cartItems = existingItems ? JSON.parse(existingItems) : [];

    const existingItemIndex = cartItems.findIndex((cartItem: any) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    const existingItems = localStorage.getItem("cartItems");
    let cartItems = existingItems ? JSON.parse(existingItems) : [];

    const existingItemIndex = cartItems.findIndex((item: any) => item.id === productId);
    if (existingItemIndex !== -1) {
      if (newQuantity <= 0) {
        cartItems.splice(existingItemIndex, 1);
      } else {
        cartItems[existingItemIndex].quantity = newQuantity;
      }
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeFromCart = (productId: string) => {
    const existingItems = localStorage.getItem("cartItems");
    let cartItems = existingItems ? JSON.parse(existingItems) : [];

    const filteredItems = cartItems.filter((item: any) => item.id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(filteredItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const clearCart = () => {
    localStorage.removeItem("cartItems");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return {
    cartItems,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    updateCart
  };
};
