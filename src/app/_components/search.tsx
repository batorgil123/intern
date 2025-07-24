"use client";

import { Search } from "lucide-react";
import React from "react";

interface SearchInputProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}

export default function Searchinput({
  onChange,
  defaultValue,
}: SearchInputProps) {
  return (
    <div className="w-[300px] h-[36px] rounded-[10px] bg-white flex  flex-row  justify-between items-center p-[8px] border border-gray-300 gap-3">
      <Search className="text-[#505050]" size={18} />
      <input
        className="w-full h-full outline-none text-gray-700 placeholder:text-gray-400 placeholder:text-[14px] text-[14px] "
        placeholder="Хайх"
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
}
