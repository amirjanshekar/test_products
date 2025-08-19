"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const useDebounce = (
  value: string = "",
  sideAction?: () => void,
  delay: number = 1000,
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const newSearchParams = new URLSearchParams(searchParams.toString());

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
  }, [value, delay]);
};

export default useDebounce;
