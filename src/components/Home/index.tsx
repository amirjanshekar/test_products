"use client";

import React, { FunctionComponent, ReactNode, useMemo, useState } from "react";
import { PaginatedRes, Product } from "@/types";
import { Card, Filters, PaginationComponent } from "@/components";
import { useDebounce } from "@/utils/hooks";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useGetCachedProducts } from "@/api/cache";
import Skeleton from "react-loading-skeleton";
import { Ordering } from "@/types/OrderingInterface";

interface HomeProps {
  initialData: PaginatedRes<Product>;
}

const Home: FunctionComponent<HomeProps> = ({ initialData }) => {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const searchQuery: string | null = searchParams.get("name");

  const [name, setName] = useState<string>(searchQuery ?? "");
  const [page, setPage] = useState<number>(initialData?.pagination.page ?? 1);
  const [ordering, setOrdering] = useState<Ordering>("name");

  useDebounce(name, () => setPage(1));

  const { data, isLoading } = useGetCachedProducts(
    {
      name: searchQuery,
      page,
      ordering,
    },
    initialData,
  );

  const memoizedRenderData: ReactNode = useMemo(() => {
    if (!isLoading) {
      return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6 w-full">
          {data?.result?.map((product: Product) => (
            <Card data={product} key={product?.id} />
          ))}
        </div>
      );
    }
  }, [data, isLoading]);

  const memoizedRenderSkeleton: ReactNode = useMemo(() => {
    if (isLoading) {
      return (
        <Skeleton
          count={20}
          height={290}
          inline
          containerClassName="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6 w-full"
        />
      );
    }
  }, [data, isLoading]);

  return (
    <div className="bg-blue-100 h-screen relative overflow-auto">
      <Filters
        setName={setName}
        name={name}
        ordering={ordering}
        setOrdering={setOrdering}
      />
      <div className="px-6">
        {memoizedRenderSkeleton}
        {memoizedRenderData}
      </div>

      <PaginationComponent pagination={data?.pagination} setPage={setPage} />
    </div>
  );
};

export default Home;
