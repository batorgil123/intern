"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CartItem {
  id: string;
  title: string;
  price: number | string;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

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

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  if (!isClient) {
    return (
      <div className="w-full h-screen bg-gray-200 flex flex-col">
        <div className="w-full px-[28px] flex flex-col items-center justify-center p-8">
          <div className="w-full flex gap-2 items-center">
            <p className="text-[18px] font-bold font-Inter">Сагс</p>
            <p className="text-[16px] text-[#7E7E83] font-Inter">(0 бараа)</p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <div className="w-3/4 flex flex-row items-center gap-8 py-8">
              <div className="w-full flex flex-col items-center justify-center rounded-[12px] bg-gray-100 p-2 shadow-sm">
                <p className="text-gray-500">Уншиж байна...</p>
              </div>
            </div>
            <div className="flex flex-col w-[20%] h-[168px] bg-white rounded-[12px] justify-center items-center p-4 shadow-sm gap-5 mt-9">
              <button className="cursor-pointer w-[90%] h-[40px] bg-[#0AAD0A] flex items-center justify-center text-white font-semibold text-[16px] rounded-[12px]">
                Захиалах
              </button>
              <div className="w-[90%] h-[42px]">
                <p className="font-medium text-[14px] flex flex-row items-center justify-center gap-3">
                  Захиалгын дүн
                  <span className="text-[14px] font-bold">0.00$</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const alertDialog = () => {
    setShowAlertDialog(true);
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex flex-col">
      <div className="w-full px-[28px] flex flex-col items-center justify-center p-8">
        <div className="w-full flex gap-2 items-center">
          <p className="text-[18px] font-bold font-Inter">Сагс</p>
          <p className="text-[16px] text-[#7E7E83] font-Inter">
            ({cartItems.length} бараа)
          </p>
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="w-3/4 flex flex-row items-center gap-8 py-8">
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
          </div>
          <div className="flex flex-col w-[20%] h-[168px] bg-white rounded-[12px] justify-center items-center p-4 shadow-sm gap-5 mt-9">
            <button
              onClick={alertDialog}
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
        </div>
      </div>
      <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <AlertDialogContent className="w-[300px] flex flex-col items-center justify-center gap-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Захиалах уу?</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="w-[100px] h-[40px] bg-[#0AAD0A] flex items-center justify-center text-white font-semibold text-[16px] rounded-[12px]">
              Захиалах
            </AlertDialogAction>
            <AlertDialogAction className="w-[100px] h-[40px] bg-[#0AAD0A] flex items-center justify-center text-white font-semibold text-[16px] rounded-[12px]">
              Цуцлах
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
