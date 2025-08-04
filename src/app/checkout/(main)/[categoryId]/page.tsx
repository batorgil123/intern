import CategoryButton from "@/app/_components/category-button";
import CategorySearch from "@/app/_components/category-search";
import client from "@/lib/apollo-client";
import { GetCategoriesDocument , GetCategoriesQuery} from "../../../../../generated/graphql";
import { Suspense } from "react";
import { Spinner } from "@heroui/spinner";

async function fetchCategories(): Promise<Array<GetCategoriesQuery['categories'][number]>> {
  try {
    const { data } = await client.query({
      query: GetCategoriesDocument,
    });
    return data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

const Page = async (props: { params: { categoryId: string } }) => {
  const { categoryId } = await props.params;
  const categories = await fetchCategories();
  const selectedCategory = categories.find(
    (cat: { id: string; name: string }) => cat.id === categoryId
  );

  return (
    <div className="w-full bg-[#F4F4F4] p-[24px] flex flex-row justify-between gap-[24px] pl-5">
      <div className="w-[368px] h-fit flex flex-col bg-white rounded-[16px] p-3">
        <p className="font-semibold text-[16px] font-inter mb-4">Ангилал</p>
        <Suspense fallback={<Spinner size="lg" />}>
          <CategoryButton names={categories} currentCategoryId={categoryId} />
        </Suspense>
      </div>
      <div className="flex-1 bg-[#F4F4F4]">
        <Suspense fallback={<Spinner size="lg" />}>
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
