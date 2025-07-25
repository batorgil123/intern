"use client";

import Header from "@/app/_components/header";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "@/app/graphql/products";
import { useParams } from "next/navigation";
import Image from "next/image";

const CardDetail = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: params.id },
  });
  console.log("data:", data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const product = data.product;

  return (
    <div className="flex flex-col">
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <Image src={product.images[0]} alt={product.title} className="" />
        <p className="text-lg mb-2">${product.price}</p>
        <p className="text-gray-700">{product.description}</p>
      </div>
    </div>
  );
};
export default CardDetail;
