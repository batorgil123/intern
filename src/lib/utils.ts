import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { useState, useEffect } from "react";

export const useCart = () => {
  type CartItem = {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
  };
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const updateCart = () => {
    const savedItems = localStorage.getItem("cartItems");
    if (savedItems) {
      const items = JSON.parse(savedItems);
      setCartItems(items);
      const totalCount = items.reduce(
        (sum: number, item: {
          id: String;
          title: String;
          price: number;
          image: string;
          quantity: number;
        }) => sum + item.quantity,
        0
      );
      setCartCount(totalCount);
    } else {
      setCartItems([]);
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCart();

    const handleStorageChange = () => {
      updateCart();
    };
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

  const addToCart = (item: {
    id: String;
    title: String;
    price: number;
    image: string;
    quantity: number;
  }) => {
    const existingItems = localStorage.getItem("cartItems");
    let cartItems = existingItems ? JSON.parse(existingItems) : [];

    const existingItemIndex = cartItems.findIndex(
      (cartItem: {
        id: String;
        title: String;
        price: number;
        image: string;
        quantity: number;
      }) => cartItem.id === item.id
    );
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

    const existingItemIndex = cartItems.findIndex(
      (item: {
        id: String;
        title: String;
        price: number;
        image: string;
        quantity: number;
      }) => item.id === productId
    );
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

    const filteredItems = cartItems.filter(
      (item: {
        id: String;
        title: String;
        price: number;
        image: string;
        quantity: number;
      }) => item.id !== productId
    );
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
    updateCart,
  };
};
