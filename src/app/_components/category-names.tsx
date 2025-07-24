"use client";

import { Button } from "@/components/ui/button";

interface CategoryNamesProps {
  categories: { id: string; name: string }[];
  onSelect: (id: string) => void;
}

const buttonClass =
  "w-[344px] h-[40px] text-[16px] text-[#7E7E83] bg-white hover:bg-gray-100 duration-300 justify-start items-center shadow-none focus:bg-[#F4F4F4] focus:text-black";

const CategoryNames = ({ categories, onSelect }: CategoryNamesProps) => {
  return (
    <div className="flex flex-col flex-grow overflow-y-auto">
      {categories.map((category) => (
        <Button key={category.id} className={buttonClass} onClick={() => onSelect(category.id)}>
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryNames;
