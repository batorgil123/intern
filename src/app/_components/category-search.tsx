import { useQuery } from "@apollo/client";
import client from "@/lib/apollo-client";
import { GET_PRODUCTS } from "@/app/graphql/products";
import Card from "./card";
import Searchinput from "./search";
import { useState } from "react";
import { useBag } from "./bag-context";

export interface SearchProps {
  selectedCategoryId: string | null;
  selectedCategoryName?: string | null;
}

const categorySearch = ({ selectedCategoryId, selectedCategoryName }: SearchProps) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, { client });
  const { bagItems, addToBag, removeFromBag } = useBag();
  const [searchValue, setSearchValue] = useState("");

  const handleBagChange = (productId: string, count: number) => {
    const current =
      bagItems.find((item) => item.id === productId)?.quantity || 0;
    if (count > current) {
      addToBag(productId);
    } else if (count < current) {
      removeFromBag(productId);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) return <p>Уншиж байна...</p>;
  if (error) return <p>{error.message}</p>;

  let products = data.products;
  if (selectedCategoryId) {
    products = products.filter(
      (p: any) => p.category?.id === selectedCategoryId
    );
  }
  if (searchValue.trim() !== "") {
    const search = searchValue.trim().toLowerCase();
    products = products.filter(
      (p: any) =>
        p.title.toLowerCase().includes(search) ||
        (p.category?.name && p.category.name.toLowerCase().includes(search))
    );
  }

  return (
    <div className="w-full flex flex-col gap-[24px]  bg-gray-200">
      <div className="w-[100%] h-[84px] flex flex-row items-center justify-between p-[24px] rounded-[16px] bg-white">
        <p className="font-semibold text-[18px]">
          {selectedCategoryName}
        </p>
        <Searchinput onChange={handleSearchChange} defaultValue={searchValue} />
      </div>

      <div className="w-[100%] bg-white rounded-[16px] flex flex-wrap gap-[24px] p-[24px]">
        {products.map((product: any) => (
          <Card
            key={product.id}
            price={product.price}
            title={product.title}
            image={product.images?.[0]}
            productId={product.id}
            category={product.category}
            bagCount={
              bagItems.find((item) => item.id === product.id)?.quantity || 0
            }
            onBagChange={handleBagChange}
          />
        ))}
      </div>
    </div>
  );
};

export default categorySearch;
