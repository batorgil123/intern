"use client";

import { useRouter } from "next/navigation";
import Freshpackheader from "../icons/freshpack-header-icon";
import { ShoppingCart } from "lucide-react";
import { useBag } from "./bag-context";


const Header = () => {
  const router = useRouter();
  const { bagCount } = useBag();

  return (
    <div className="px-[2%] bg-white w-full h-[68px] flex items-center justify-between border-b-[1px] border-[#E2E2E3]">
      <button onClick={() => router.replace("/")} className="cursor-pointer">
        <Freshpackheader />
      </button> 
      <div
        onClick={() => router.push("/bag")}
        className="w-[56px] h-[36px] flex items-center justify-center bg-gray-200 rounded-full gap-[4px] border-[2px] border-gray-300 cursor-pointer"
      >
        <ShoppingCart className="p-0" size={16} />
        <div className="font-semibold text-[17px] ">
          {bagCount > 0 ? ` ${bagCount}` : ""}
        </div>
      </div>
    </div>
  );
};
export default Header;
