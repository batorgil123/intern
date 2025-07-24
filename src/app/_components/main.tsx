"use client";

import { useState } from "react";
import Category from "./category";
import Search from "./category-search";

const Main = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  return (
    <div className="w-full bg-gray-200 p-[24px] flex flex-row justify-between gap-[24px] ">
      <Category onSelectCategory={(id: string, name: string) => { setSelectedCategoryId(id); setSelectedCategoryName(name); }} />
      <Search selectedCategoryId={selectedCategoryId} selectedCategoryName={selectedCategoryName} />
    </div>
  );
};

export default Main;
