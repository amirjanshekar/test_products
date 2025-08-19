import React, { FunctionComponent } from "react";
import { Product } from "@/types/ProductInterface";
import Image from "next/image";

interface CardProps {
  data: Product;
}
const Card: FunctionComponent<CardProps> = ({ data }) => {
  return (
    <div
      className="shadow-lg rounded-lg bg-blue-100 text-black/70 flex flex-col items-center "
      key={data?.id}
    >
      <Image
        src={data.image}
        alt={`Product_${data?.name}`}
        width={200}
        height={200}
        className="w-full h-40 rounded-lg"
      />
      <div className="p-4 pt-2 gap-y-2 flex flex-col justify-between h-42">
        <div>{data?.name}</div>
        <div className="text-sm">{data?.description}</div>
        <div className="text-end self-end w-full font-bold">${data?.price}</div>
      </div>
    </div>
  );
};

export default Card;
