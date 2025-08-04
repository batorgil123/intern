"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/lib/utils";
import { Trash2 } from "lucide-react";

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
    <div className="w-full flex flex-col items-center justify-center rounded-[12px] bg-white p-2 shadow-sm">
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Сагс хоосон байна</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="w-full flex justify-between items-center bg-white border-b border-gray-200 p-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image || "/photo.png"}
                alt={item.title}
                width={96}
                height={96}
                className="rounded-[8px] object-cover w-[96px] h-[96px]"
              />

              <div className="flex flex-col gap-2 pb-4">
                <p className="text-[16px] font-semibold pb-3">{item.price}$</p>
                <h3 className="font-regular font-inter text-[16px]">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-[5%]">
              <div className="flex items-center gap-2">
                <Trash2
                  onClick={() => handleRemoveItem(item.id)}
                  className="border border-gray-200  p-1 rounded-md hover:bg-gray-200 duration-300 cursor-pointer mr-10"
                  size={32}
                />

                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                  className="w-[32px] h-[32px] border border-gray-200  rounded-[8px] flex items-center justify-center hover:bg-gray-300 cursor-pointer pb-[6px]  text-[30px]"
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
                  className="w-[32px] h-[32px] bg-green-500 text-white rounded-[8px] flex items-center justify-center hover:bg-green-600 cursor-pointer pb-[6px]  text-[30px]"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
