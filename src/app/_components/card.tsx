"use client";

import { useState, useEffect } from "react";
import { useBag } from "./bag-context";
import Image from "next/image";

interface CardProps {
  price: number | string;
  title: string;
  image: string;
  category: {
    id: string;
    name: string;
  };
  productId: string;
  bagCount?: number;
  onBagChange?: (productId: string, count: number) => void;
}

const Card = ({ price, title, image, productId, bagCount = 0, onBagChange }: CardProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(bagCount > 0);
  const [bag, setbag] = useState(bagCount);
  const { addToBag, removeFromBag } = useBag();

  useEffect(() => {
    setbag(bagCount);
    setIsButtonDisabled(bagCount > 0);
  }, [bagCount]);

  const handleClick = () => {
    setIsButtonDisabled(true);
    setbag(bag + 1);
    if (bag === 0) {
      addToBag(productId);
    }
    onBagChange && onBagChange(productId, bag + 1);
  };

  const handleCount = (isAdd: boolean) => {
    if (isAdd) {
      setbag(bag + 1);
      if (bag === 0) {
        addToBag(productId);
      }
      onBagChange && onBagChange(productId, bag + 1);
    } else if (bag > 0) {
      setbag(bag - 1);
      if (bag - 1 === 0) {
        removeFromBag(productId);
      }
      onBagChange && onBagChange(productId, bag - 1);
    } else if (bag == 0) {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="relative w-[220px]  bg-[#F3F3F3] rounded-[20px] p-[12px] flex flex-col justify-between">
      <div
        hidden={!isButtonDisabled || bag == 0}
        className="absolute w-[196px] h-[196px] rounded-[12px] flex items-center justify-center bg-black opacity-[0.3]"
      ></div>
      <div
        hidden={!isButtonDisabled || bag == 0}
        className="absolute z-10 w-[196px] h-[196px] flex items-center justify-center bg-none"
      >
        <p className="absolute z-10 text-white font-semibold text-[40px]">
          {bag}
        </p>
      </div>

      <Image
        src={image || "/photo.png"}
        alt={title}
        width={196}
        height={196}
        className="w-[196px] h-[196px] rounded-[12px] object-cover"
      />
      <div className="max-w-[196px] flex flex-col gap-[4px] p-[8px]">
        <p className="font-bold font-Inter text-[16px]">{price}$</p>
        <p className="font-[400] font-Inter text-[16px]">{title}</p>
      </div>

      <button
        hidden={isButtonDisabled && bag > 0}
        onClick={handleClick}
        className="bg-white cursor-pointer rounded-[12px] w-[196px] h-[40px] flex items-center justify-center text-[16px] font-semibold font-Inter p-[10px] gap-[4px] hover:bg-gray-200 duration-300"
      >
        Сагслах
      </button>

      <div
        hidden={!isButtonDisabled || bag == 0}
        className="w-full h-[40px] flex items-center justify-between p-2"
      >
        <button
          onClick={() => handleCount(false)}
          className="w-[40px] h-[35px] bg-white rounded-[12px] text-[25px] flex items-center justify-center pb-1 hover:bg-gray-300 duration-300"
        >
          -
        </button>
        <button
          onClick={() => handleCount(true)}
          className="w-[40px] h-[35px] bg-[#0AAD0A] rounded-[12px] text-[25px] text-white flex items-center justify-center pb-1 hover:bg-yellow-500 duration-300 "
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Card;
