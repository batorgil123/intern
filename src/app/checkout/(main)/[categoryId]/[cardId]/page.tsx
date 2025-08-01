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
  return (
    <div className="w-full h-screen bg-[#F4F4F4] p-[24px] flex flex-col gap-[24px]">
      <div className="flex flex row gap-[21px]">
        <p className="text-[#7E7E83] text-[14px] font-inter font-semibold">
          Бөөндье
        </p>
        <p className="text-[14px] font-inter font-semibold">{product.title}</p>
      </div>
      <div className="flex flex-row gap-30">
        <Image
          src={product.images[0] || "/photo.png"}
          alt={product.title}
          width={86}
          height={86}
          className="rounded-[16px] h-[86px] w-[86px]"
        />
        <Image
          src={product.images[0] || "/photo.png"}
          alt={product.title}
          width={478}
          height={478}
          className="rounded-[16px] h-[478px] w-[478px]"
        />
        <div className="flex flex-col rounded-[16px] w-[35%] h-fit bg-white p-[24px] gap-[10px]">
          <p className="text-[18px] font-inter font-bold">{product.title}</p>
          <p className="text-[14px] font-inter font-semibold">
            Дэлгэрэнгүй мэдээлэл
          </p>
          <p className="text-[14px] font-inter font-regular">
            {product.description}
          </p>
        </div>
        <div className="w-[20%] flex flex-col p-5 bg-white rounded-[16px] gap-[24px] h-fit">
          <p className="font-bold text-[24px] font-inter pl-7">
            {product.price}$
          </p>
          <div className="flex flex-col gap-[16px] items-center w-full h-fit">
            <button className="bg-[#0AAD0A] text-white rounded-[12px] h-[50px] w-[85%] hover:bg-[#0AAD0A]/80 transition duration-300 ease-in-out font-semibold font-inter cursor-pointer">
              Сагслах
            </button>
            <button className="border border-gray-300 rounded-[12px] h-[50px] w-[85%] hover:bg-gray-200 transition duration-300 ease-in-out font-semibold font-inter cursor-pointer">
              Шууд авах
            </button>
          </div>
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
              <a href={`/checkout/${categoryId}/${item.id}`}>
                <Image
                  src={item.images[0] || "/photo.png"}
                  alt={item.title}
                  width={196}
                  height={196}
                  className="rounded-[12px] h-[196px] w-[196px] cursor-pointer"
                />
              </a>
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
