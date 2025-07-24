"use client";

import { useState, useEffect } from "react";
import { useBag } from "./bag-context";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface BagCardProps {
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

const BagCard = ({
  price,
  title,
  image,
  productId,
  bagCount = 0,
  onBagChange,
}: BagCardProps) => {
  const [bag, setbag] = useState(bagCount);
  const { addToBag, removeFromBag } = useBag();

  useEffect(() => {
    setbag(bagCount);
  }, [bagCount]);

  const handleCount = (isAdd: boolean) => {
    if (isAdd) {
      setbag(bag + 1);
      if (bag === 0) {
        addToBag(productId);
      }
      onBagChange && onBagChange(productId, bag + 1);
    } else if (bag > 0) {
      setbag(bag - 1);
      onBagChange && onBagChange(productId, bag - 1);
    }
  };

  return (
    <div className=" w-full  bg-[#F3F3F3]  p-[12px] flex flex-row justify-between items-center">
      <Image
        src={image || "/photo.png"}
        alt={title}
        width={96}
        height={96}
        className="w-[96px] h-[96px] rounded-[12px] object-cover"
      />
      <div className="flex flex-col justify-between h-[98px] w-full ml-[16px]">
        <div className="w-full flex flex-col gap-[4px] ">
          <p className="font-bold font-Inter text-[16px]">{price}$</p>
          <p className="font-[400] font-Inter text-[16px]">{title}</p>
        </div>

        <div className="w-full h-[32px] flex flex-row items-center justify-end gap-10">
          <button
            onClick={() => removeFromBag(productId)}
            className="w-[32px] h-[30px] border border-gray-300 rounded-[12px] text-[25px] flex items-center justify-center hover:bg-gray-300 duration-300"
          >
            <Trash2 size={17} />
          </button>
          <button
            onClick={() => handleCount(false)}
            className="w-[32px] h-[30px] bg-white rounded-[12px] text-[25px] flex items-center justify-center pb-1 hover:bg-gray-300 duration-300"
          >
            -
          </button>
          <p className="text-[20px] font-semibold">{bag}</p>
          <button
            onClick={() => handleCount(true)}
            className="w-[32px] h-[30px] bg-[#0AAD0A] rounded-[12px] text-[25px] text-white flex items-center justify-center pb-1 hover:bg-yellow-500 duration-300 "
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default BagCard;
