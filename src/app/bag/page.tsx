"use client";

import Header from "../_components/header";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/products";
import { useBag } from "../_components/bag-context";
import BagCard from "../_components/bag-card";

const Bag = () => {
  const { bagItems } = useBag();
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading)
    return (
      <div className="w-full  text-2xl text-gray-500 font-semibold mt-20 flex flex-col items-center gap-2">
        Уншиж байна...
      </div>
    );
  if (error) return <div>Алдаа гарлаа: {error.message}</div>;

  const bagProducts =
    data?.products.filter((product: any) =>
      bagItems.some((item) => item.id === product.id)
    ) || [];

  const total = bagProducts.reduce((sum: number, product: any) => {
    const bagItem = bagItems.find((item) => item.id === product.id);
    return sum + product.price * (bagItem?.quantity || 0);
  }, 0);

  return (
    <div className="w-full h-screen bg-gray-200 flex flex-col">
      <Header />
      <div className="w-full px-[28px] flex flex-col items-center justify-center p-8">
        <div className="w-full flex gap-2 items-center">
          <p className="text-[18px] font-bold font-Inter">Сагс</p>
          <p className="text-[16px] text-[#7E7E83] font-Inter">
            ({bagProducts.length} бараа)
          </p>
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="w-3/4 flex flex-row items-center gap-8 py-8">
            <div className="w-full flex flex-col items-center justify-center rounded-[12px] bg-gray-100 p-2 shadow-sm">
              {bagProducts.map((product: any) => {
                const bagItem = bagItems.find((item) => item.id === product.id);
                return (
                  <div
                    key={product.id}
                    className="w-full flex justify-center flex-col items-center rounded-[12px]  mb-1 bg-gray-200 shadow-sm"
                  >
                    <BagCard
                      price={product.price}
                      title={product.title}
                      image={product.images?.[0] || "/photo.png"}
                      category={product.category}
                      productId={product.id}
                      bagCount={bagItem?.quantity || 0}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col w-[20%] h-[168px] bg-white rounded-[12px] justify-center items-center p-4 shadow-sm gap-5 mt-9">
            <button className="cursor-pointer w-[90%] h-[40px] bg-[#0AAD0A] flex items-center justify-center text-white font-semibold text-[16px] rounded-[12px]">Захиалах</button>
            <div className="w-[90%] h-[42px]">
              <p className="font-medium text-[14px] flex flex-row items-center justify-center gap-3">Захиалгын дүн 
                <span className="text-[14px] font-bold">
                  {total}$
                </span>
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default Bag;
