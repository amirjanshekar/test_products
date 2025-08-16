"use client";

import React, {
  FunctionComponent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { PaginatedRes, Product } from "@/types";
import { Card, Filters, PaginationComponent } from "@/components";
import { useDebounce } from "@/utils/hooks";
import { useSearchParams } from "next/navigation";
import {getCachedProducts} from "@/api/cache";


interface HomeProps {
  data: PaginatedRes<Product>;
}

const Home: FunctionComponent<HomeProps> = ({ data }) => {
  const parentRef: RefObject<HTMLDivElement | null> = useRef(null);

  const searchParams = useSearchParams();

  const [name, setName] = useState<string>("");

  const [activeView, setActiveView] = useState<"pagination" | "infinite">(
    "pagination",
  );

  const [page, setPage] = useState<number>(data?.pagination.page ?? 1);

  const [products, setProducts] = useState<PaginatedRes<Product>>(data);

  useDebounce(name);

  useEffect(() => {
    if (searchParams.get("name") !== "") {
      getCachedProducts({ name: searchParams.get("name"), page }).then(
        (res) => {
          setProducts(res);
        },
      );
    } else {
      setProducts(data);
    }
  }, [searchParams.get("name"), page]);

  useEffect(() => {
    setPage(1);
  }, [activeView]);

  return (
    <div className="bg-blue-100 p-6">
      <Filters
        setName={setName}
        name={name}
        setActiveView={setActiveView}
        activeView={activeView}
      />
      <div
        ref={parentRef}
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6 w-full"
      >
        {products?.result.map((product: Product) => (
          <Card data={product} key={product?.id} />
        ))}
      </div>
      {activeView === "pagination" && (
        <PaginationComponent
          pagination={products?.pagination}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default Home;
