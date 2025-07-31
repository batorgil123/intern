"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/utils";

export default function CartHeader() {
  const { cartItems } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full flex gap-2 items-center">
      <p className="text-[18px] font-bold font-Inter">Сагс</p>
      <p className="text-[16px] text-[#7E7E83] font-Inter">
        ({isClient ? cartItems.length : 0} бараа)
      </p>
    </div>
  );
} 