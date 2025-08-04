"use client";

import { useCart } from "@/lib/utils";
import { useState } from "react";

interface AddToBagProps {
  price: number;
  title: string;
  image: string;
  productId: string;
}
const AddToBag = ({ price, title, image, productId }: AddToBagProps) => {
  const { addToCart, removeFromCart } = useCart();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleRemoveFromCart = () => {
    setIsButtonDisabled(false);
    removeFromCart(productId);
  };
  const handleAddToCart = () => {
    setIsButtonDisabled(true);
    const cartItem = {
      id: productId,
      title: title,
      price: price,
      image: image,
      quantity: 1,
    };
    addToCart(cartItem);
  };
  return (
    <>
      <button
        hidden={isButtonDisabled}
        onClick={handleAddToCart}
        className="bg-[#0AAD0A] text-white rounded-[12px] h-[50px] w-[85%] hover:bg-[#0AAD0A]/80 transition duration-300 ease-in-out font-semibold font-inter cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0AAD0A]/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed focus:bg-[#0AAD0A]/80 disabled:hover:bg-[#0AAD0A] disabled:focus:bg-[#0AAD0A] disabled:focus:ring-0 disabled:focus:ring-offset-0 disabled:focus:outline-none disabled:transition-all disabled:duration-300 disabled:ease-in-out"
      >
        Сагслах
      </button>
      <button
        onClick={handleRemoveFromCart}
        hidden={!isButtonDisabled}
        className=" h-[50px] w-[85%] bg-gray-200 font-inter font-semibold rounded-[12px] cursor-pointer hover:bg-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:focus:bg-gray-200 disabled:focus:ring-0 disabled:focus:ring-offset-0 disabled:focus:outline-none disabled:transition-all disabled:duration-300 disabled:ease-in-out"
      >
        Буцаах
      </button>
    </>
  );
};
export default AddToBag;
