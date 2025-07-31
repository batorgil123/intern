import CategoryButton from "../_components/category-button";
import client from "@/lib/apollo-client";
import { GET_CATEGORIES } from "@/app/graphql/products";
import CategorySearch from "../_components/category-search";

async function fetchData() {
  try {
    const { data } = await client.query({
      query: GET_CATEGORIES,
    });
    return {
      categories: data.categories,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      categories: [],
    };
  }
}

const Page = async () => {
  const { categories } = await fetchData();
  
  return (
    <div className="w-full bg-gray-200 p-[24px] flex flex-row justify-between gap-[24px]">
      <div className="w-[368px] h-[700px] flex flex-col bg-white rounded-[16px] p-3">
        <p className="font-semibold text-[16px] mb-4">Ангилал</p>
        <CategoryButton names={categories} />
      </div>
      <div className="flex-1">
        <CategorySearch selectedCategoryId={null} />
      </div>
    </div>
  );
};

export default Page;
