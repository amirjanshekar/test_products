"use client";

import { useEffect, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const useDebounce = (
  value: string = "",
  sideAction?: () => void,
  delay: number = 1000,
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const newSearchParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      sideAction?.();
      newSearchParams.set("name", value);
      if (value !== "") {
        router.replace(`${pathname}?${newSearchParams.toString()}`);
      } else {
        router.replace(`${pathname}`);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, sideAction, pathname, router, newSearchParams]);
};

export default useDebounce;
