import CategoryButton from "@/app/_components/category-button";
import CategorySearch from "@/app/_components/category-search";
import client from "@/lib/apollo-client";
import { GET_CATEGORIES } from "@/app/graphql/products";
import { Suspense } from "react";

async function fetchCategories() {
  try {
    const { data } = await client.query({
      query: GET_CATEGORIES,
    });
    return data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

const Page = async (props: { params: { categoryId: string } }) => {
  const { categoryId } = props.params;
  const categories = await fetchCategories();
  const selectedCategory = categories.find(
    (cat: { id: string; name: string }) => cat.id === categoryId
  );

  return (
    <div className="w-full bg-gray-200 p-[24px] flex flex-row justify-between gap-[24px]">
      <div className="w-[368px] h-[700px] flex flex-col bg-white rounded-[16px] p-3">
        <p className="font-semibold text-[16px] mb-4">Ангилал</p>
        <CategoryButton names={categories} />
      </div>
      <div className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <CategorySearch
            selectedCategoryId={categoryId}
            selectedCategoryName={selectedCategory?.name}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
