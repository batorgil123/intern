"use client";

import Card from "./card";
import { useState } from "react";
import { Search } from "lucide-react";
import { useCart } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  price: number;
  images?: string[];
  category?: {
    id: string;
    name: string;
  };
}

interface SearchProps {
  products: Product[];
  selectedCategoryId: string | null;
  selectedCategoryName?: string | null;
}

const CategorySearchClient = ({
  products,
  selectedCategoryId,
  selectedCategoryName,
}: SearchProps) => {
  const [searchValue, setSearchValue] = useState("");
  const { cartItems } = useCart();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  let filteredProducts = products;

  if (selectedCategoryId) {
    filteredProducts = filteredProducts.filter(
      (p: Product) => p.category?.id === selectedCategoryId
    );
  }

  if (searchValue.trim() !== "") {
    const search = searchValue.trim().toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p: Product) =>
        p.title.toLowerCase().includes(search) ||
        (p.category?.name && p.category.name.toLowerCase().includes(search))
    );
  }

  return (
    <div className="w-full flex flex-col gap-[24px] bg-[#F4F4F4]">
      <div className="w-[100%] h-[84px] flex flex-row items-center justify-between p-[24px] rounded-[16px] bg-white ">
        <p className="font-bold font-inter text-[18px]">
          {selectedCategoryName || "All Products"}
        </p>
        <div className="w-[300px] h-[36px] rounded-[10px] bg-white flex flex-row justify-between items-center p-[8px] border border-gray-300 gap-3">
          <Search className="text-[#505050]" size={18} />
          <input
            className="w-full h-full outline-none text-gray-700 placeholder:text-gray-400 placeholder:text-[14px] text-[14px]"
            placeholder="Хайх"
            onChange={handleSearchChange}
            value={searchValue}
          />
        </div>
      </div>

      <div className="w-[100%] bg-white rounded-[16px] flex flex-wrap gap-[30px] p-[24px] flex pl-15">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          filteredProducts.map((product: Product) => {
            const cartItem = cartItems.find((item: {
              id: String;
              title: String;
              price: number;
              image: string;
              quantity: number;
            }) => item.id === product.id);
            const bagCount = cartItem ? cartItem.quantity : 0;
            
            return (
              <Card
                key={product.id}
                price={product.price}
                title={product.title}
                image={product.images?.[0] || ""}
                productId={product.id}
                category={product.category || { id: "", name: "" }}
                bagCount={bagCount}
                onBagChange={() => {}}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategorySearchClient; 