"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/lib/utils";

interface CartItem {
  id: string;
  title: string;
  price: number | string;
  image: string;
  quantity: number;
}

export default function CartItems() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  if (!isClient) {
    return (
      <div className="w-full flex flex-col items-center justify-center rounded-[12px] bg-gray-100 p-2 shadow-sm">
        <p className="text-gray-500">Сагс хоосон байна</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center rounded-[12px] bg-gray-100 p-2 shadow-sm">
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Сагс хоосон байна</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="w-full flex justify-between items-center rounded-[12px] mb-4 bg-white shadow-sm p-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image || "/photo.png"}
                alt={item.title}
                width={80}
                height={80}
                className="rounded-[8px] object-cover"
              />
              <div>
                <h3 className="font-semibold text-[16px]">
                  {item.title}
                </h3>
                <p className="text-[14px] text-gray-600">
                  {item.price}$
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                  className="w-[32px] h-[32px] bg-gray-200 rounded-[8px] flex items-center justify-center hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-[40px] text-center font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                  className="w-[32px] h-[32px] bg-green-500 text-white rounded-[8px] flex items-center justify-center hover:bg-green-600"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Устгах
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
} 