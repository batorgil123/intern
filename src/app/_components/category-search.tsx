import client from "@/lib/apollo-client";
import { GET_PRODUCTS } from "@/app/graphql/products";
import CategorySearchClient from "./category-search-client";

interface Product {
  id: string;
  title: string;
  price: number | string;
  images?: string[];
  category?: {
    id: string;
    name: string;
  };
}

interface SearchProps {
  selectedCategoryId: string | null;
  selectedCategoryName?: string | null;
}

async function fetchProducts() {
  try {
    const { data } = await client.query({
      query: GET_PRODUCTS,
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
    <CategorySearchClient
      products={products}
      selectedCategoryId={selectedCategoryId}
      selectedCategoryName={selectedCategoryName}
    />
  );
};

export default CategorySearch;
