"use client";

import Freshpackheader from "../icons/freshpack-header-icon";
import { ShoppingCart, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/utils";

const Header = () => {
  const { cartCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <div className="px-[2%] bg-white w-full h-[68px] flex items-center justify-between border-b-[1px] border-[#E2E2E3]">
      <Link href={isLoggedIn ? "/checkout" : "/login"} className="cursor-pointer">
        <Freshpackheader />
      </Link>
      
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <Link
            href={"/cart"}
            className="relative w-[56px] h-[36px] flex items-center justify-center bg-gray-200 rounded-full gap-[4px] border-[2px] border-gray-300 cursor-pointer"
          >
            <ShoppingCart className="p-0" size={16} />
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </div>
            )}
          </Link>
        )}
        
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={16} />
              Гарах
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <LogIn size={16} />
            Нэвтрэх
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
