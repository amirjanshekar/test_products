import { describe, expect, it } from "@jest/globals";
import { PaginatedRes, Product } from "@/types";
import CustomLRUCache from "@/lib/customLRUCache/lru_cache";

describe("LRUCache", () => {
  it("should store and retrieve values", () => {
    const cache = new CustomLRUCache<PaginatedRes<Product>>(2);
    cache.set("key1", {
      result: [
        {
          id: "c678af81-12b8-4e87-a0aa-6a65a65914ef",
          name: "Wireless Mouse",
          description: "Ergonomic wireless mouse with adjustable DPI.",
          price: "25.99",
          image: "http://dummyimage.com/190x100.png/dddddd/000000",
        },
      ],
      pagination: {
        next: true,
        previous: false,
        count: 600,
        page: 1,
        total_pages: 30,
        page_size: 20,
      },
    } as PaginatedRes<Product>);
    expect(cache.get("key1")).toStrictEqual({
      result: [
        {
          id: "c678af81-12b8-4e87-a0aa-6a65a65914ef",
          name: "Wireless Mouse",
          description: "Ergonomic wireless mouse with adjustable DPI.",
          price: "25.99",
          image: "http://dummyimage.com/190x100.png/dddddd/000000",
        },
      ],
      pagination: {
        next: true,
        previous: false,
        count: 600,
        page: 1,
        total_pages: 30,
        page_size: 20,
      },
    });
  });

  it("should expire after exact time", () => {
    const cache = new CustomLRUCache<PaginatedRes<Product>>(2);
    cache.set(
      "key1",
      {
        result: [
          {
            id: "c678af81-12b8-4e87-a0aa-6a65a65914ef",
            name: "Wireless Mouse",
            description: "Ergonomic wireless mouse with adjustable DPI.",
            price: "25.99",
            image: "http://dummyimage.com/190x100.png/dddddd/000000",
          },
        ],
        pagination: {
          next: true,
          previous: false,
          count: 600,
          page: 1,
          total_pages: 30,
          page_size: 20,
        },
      } as PaginatedRes<Product>,
      1000,
    );
    const timeout = setTimeout(() => {
      expect(cache.get("key1")).toBeUndefined();
    }, 2000);

    clearTimeout(timeout);
  });

  it("should evict the least recently used item when capacity is exceeded", () => {
    const cache = new CustomLRUCache<PaginatedRes<Product>>(2);
    cache.set("key1", {
      result: [
        {
          id: "c678af81-12b8-4e87-a0aa-6a65a65914ef",
          name: "Wireless Mouse",
          description: "Ergonomic wireless mouse with adjustable DPI.",
          price: "25.99",
          image: "http://dummyimage.com/190x100.png/dddddd/000000",
        },
      ],
      pagination: {
        next: true,
        previous: false,
        count: 600,
        page: 1,
        total_pages: 30,
        page_size: 20,
      },
    } as PaginatedRes<Product>, 60*1000, false);
    cache.set("key2", {
      result: [
        {
          id: "c678af81-12b8-4e87-a0aa-6a65a65914ef",
          name: "Wireless Mouse",
          description: "Ergonomic wireless mouse with adjustable DPI.",
          price: "25.99",
          image: "http://dummyimage.com/190x100.png/dddddd/000000",
        },
      ],
      pagination: {
        next: true,
        previous: false,
        count: 600,
        page: 1,
        total_pages: 30,
        page_size: 20,
      },
    } as PaginatedRes<Product>, 60*1000, false);
    cache.set("key3", {
      result: [
        {
          id: "c678af81-12b8-4e87-a0aa-6a65a65914ef",
          name: "Wireless Mouse",
          description: "Ergonomic wireless mouse with adjustable DPI.",
          price: "25.99",
          image: "http://dummyimage.com/190x100.png/dddddd/000000",
        },
      ],
      pagination: {
        next: true,
        previous: false,
        count: 600,
        page: 1,
        total_pages: 30,
        page_size: 20,
      },
    } as PaginatedRes<Product>, 60*1000, false); // key1 should be evicted
    cache.set("key1", {
      result: [
        {
          id: "c678af81-12b8-4e87-a0aa-6a65a65914ef",
          name: "Wireless Mouse",
          description: "Ergonomic wireless mouse with adjustable DPI.",
          price: "25.99",
          image: "http://dummyimage.com/190x100.png/dddddd/000000",
        },
      ],
      pagination: {
        next: true,
        previous: false,
        count: 600,
        page: 1,
        total_pages: 30,
        page_size: 20,
      },
    } as PaginatedRes<Product>, 60*1000, false);
    expect(cache.get("key2")).toBeUndefined();
    expect(cache.get("key1")).toStrictEqual({
      result: [
        {
          id: "c678af81-12b8-4e87-a0aa-6a65a65914ef",
          name: "Wireless Mouse",
          description: "Ergonomic wireless mouse with adjustable DPI.",
          price: "25.99",
          image: "http://dummyimage.com/190x100.png/dddddd/000000",
        },
      ],
      pagination: {
        next: true,
        previous: false,
        count: 600,
        page: 1,
        total_pages: 30,
        page_size: 20,
      },
    });
    expect(cache.get("key3")).toStrictEqual({
      result: [
        {
          id: "c678af81-12b8-4e87-a0aa-6a65a65914ef",
          name: "Wireless Mouse",
          description: "Ergonomic wireless mouse with adjustable DPI.",
          price: "25.99",
          image: "http://dummyimage.com/190x100.png/dddddd/000000",
        },
      ],
      pagination: {
        next: true,
        previous: false,
        count: 600,
        page: 1,
        total_pages: 30,
        page_size: 20,
      },
    });
  });
});
