"use client";

import { useState, useMemo } from "react";
import CategoryNames from "./category-names";
import { useQuery } from "@apollo/client";
import client from "@/lib/apollo-client";
import { GET_CATEGORIES } from "@/app/graphql/products";

const Category = ({
  onSelectCategory,
}: {
  onSelectCategory: (id: string, name: string) => void;
}) => {
  const { data, loading, error } = useQuery(GET_CATEGORIES, { client });
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const categories = data?.categories || [];

  if (loading) return <p>Уншиж байна...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="w-[368px] h-[700px] flex flex-col bg-white rounded-[16px] p-3">
      <p className="font-semibold text-[16px] mb-4">Ангилал</p>
      <CategoryNames
        categories={categories}
        onSelect={(id) => {
          setSelectedCategoryId(id);
          const name = categories.find((c: any) => c.id === id)?.name || "";
          onSelectCategory(id, name);
        }}
      />
    </div>
  );
};

export default Category;
