import CustomLRUCache from "@/lib/lru_cache";
import { describe, expect, it } from "@jest/globals";
import { PaginatedRes, Product } from "@/types";

describe("LRUCache", () => {
  it("should store and retrieve values", () => {
    const cache = new CustomLRUCache(2);
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
    expect(cache.get("key1")).toBe("value1");
  });

  it("should expire after exact time", () => {
    const cache = new CustomLRUCache(2);
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
    setTimeout(() => {
      expect(cache.get("key1")).toBeUndefined();
    }, 2000);
  });

  it("should evict the least recently used item when capacity is exceeded", () => {
    const cache = new CustomLRUCache(2);
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
    } as PaginatedRes<Product>);
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
    } as PaginatedRes<Product>); // key1 should be evicted
    expect(cache.get("key1")).toBeUndefined();
    expect(cache.get("key2")).toBe("value2");
    expect(cache.get("key3")).toBe("value3");
  });
});
