import client from "@/lib/apollo-client";
import { GET_PRODUCTS } from "@/app/graphql/products";
import Image from "next/image";

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

const Page = async (props: {
  params: { categoryId: string; cardId: string };
}) => {
  const { categoryId, cardId } = await props.params;
  const products = await fetchProducts();
  const product = products.find((product: any) => product.id === cardId);
  console.log(product);
  return (
    <div className="w-full h-screen bg-[#F4F4F4] p-[24px] flex flex-col gap-[24px]">
      <div className="flex flex row gap-[21px]">
        <p className="text-[#7E7E83] text-[14px] font-inter font-semibold">
          Бөөндье
        </p>
        <p className="text-[14px] font-inter font-semibold">{product.title}</p>
      </div>
      <div className="flex flex-row gap-[24px]">
        <Image
          src={product.images[0]}
          alt={product.title}
          width={86}
          height={86}
          className="rounded-[16px] h-[86px] w-[86px]"
        />
        <Image
          src={product.images[0]}
          alt={product.title}
          width={478}
          height={478}
          className="rounded-[16px] h-[478px] w-[478px]"
        />
        <div className="flex flex-col rounded-[16px] w-[424px] max-h-[300px] bg-white p-[24px] gap-[10px]">
          <p className="text-[18px] font-inter font-bold">{product.title}</p>
          <p className="text-[14px] font-inter font-semibold">
            Дэлгэрэнгүй мэдээлэл
          </p>
          <p className="text-[14px] font-inter font-regular">
            {product.description}
          </p>
        </div>
        
      </div>
      <div className="flex flex-col gap-[16px] bg-white rounded-[16px] p-[24px]">
          <p className="text-[18px] font-inter font-bold">Санал болгох</p>
          <div className="flex flex-row gap-[16px] mt-[16px]">
            {products.slice(0, 9).map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col gap-[16px] items-start w-[220px]"
              >
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  width={196}
                  height={196}
                  className="rounded-[12px] h-[196px] w-[196px] cursor-pointer"
                />
                <p className="font-bold font-inter text-[16px] ">{item.price}$</p>
                <p className="text-[16px] font-inter font-regular">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Page;
