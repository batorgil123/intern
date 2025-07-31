"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/utils";

interface CartItem {
  id: string;
  title: string;
  price: number | string;
  image: string;
  quantity: number;
}

interface CartSummaryProps {
  onOrderClick: () => void;
}

export default function CartSummary({ onOrderClick }: CartSummaryProps) {
  const { cartItems } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const total = cartItems.reduce((sum: number, item: CartItem) => {
        const price =
          typeof item.price === "string" ? parseFloat(item.price) : item.price;
        return sum + price * item.quantity;
      }, 0);
      setTotalPrice(total);
    }
  }, [cartItems, isClient]);

  if (!isClient) {
    return (
      <div className="flex flex-col w-[20%] h-[168px] bg-white rounded-[12px] justify-center items-center p-4 shadow-sm gap-5 mt-9">
        <div className="w-[90%] h-[40px] bg-gray-200 rounded-[12px] animate-pulse"></div>
        <div className="w-[90%] h-[42px] bg-gray-200 rounded-[8px] animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[20%] h-[168px] bg-white rounded-[12px] justify-center items-center p-4 shadow-sm gap-5 mt-9">
      <button
        onClick={onOrderClick}
        className="cursor-pointer w-[90%] h-[40px] bg-[#0AAD0A] flex items-center justify-center text-white font-semibold text-[16px] rounded-[12px]"
      >
        Захиалах
      </button>
      <div className="w-[90%] h-[42px]">
        <p className="font-medium text-[14px] flex flex-row items-center justify-center gap-3">
          Захиалгын дүн
          <span className="text-[14px] font-bold">
            {totalPrice.toFixed(2)}$
          </span>
        </p>
      </div>
    </div>
  );
} 