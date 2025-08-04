import client from "@/lib/apollo-client";
import { GetProductsDocument } from "../../../generated/graphql";
import CategorySearchClient from "./category-search-client";
import { Suspense } from "react";

interface SearchProps {
  selectedCategoryId: string | null;
  selectedCategoryName?: string | null;
}

async function fetchProducts() {
  try {
    const { data } = await client.query({
      query: GetProductsDocument,
    });
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const CategorySearch = async ({
  selectedCategoryId,
  selectedCategoryName,
}: SearchProps) => {
  const products = await fetchProducts();

  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <CategorySearchClient
        products={products}
        selectedCategoryId={selectedCategoryId}
        selectedCategoryName={selectedCategoryName}
      />
    </Suspense>
  );
};

export default CategorySearch;
