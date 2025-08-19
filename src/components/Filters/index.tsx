import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Ordering } from "@/types/OrderingInterface";
import { cx } from "class-variance-authority";

interface FiltersProps {
  setName: Dispatch<SetStateAction<string>>;
  name: string;
  setOrdering: Dispatch<SetStateAction<Ordering>>;
  ordering: Ordering;
}

const Filters: FunctionComponent<FiltersProps> = ({
  name,
  setName,
  ordering,
  setOrdering,
}) => {
  return (
    <div className="flex justify-between mb-6 text-black w-full sticky top-0 bg-blue-100 p-6 shadow z-20">
      <input
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-64 h-10 px-2 border border-black/30 rounded placeholder:text-sm outline-0 focus:shadow"
        placeholder="Search..."
      />
      <div className="flex items-center justify-center gap-4">
        <div className="text-md">Sort by:</div>
        <div
          className={cx(
            "p-2 border border-blue-400 text-blue-400 cursor-pointer rounded",
            ordering === "-price" && "bg-blue-400 text-white cursor-default",
          )}
          onClick={() => setOrdering("-price")}
        >
          Max Price
        </div>
        <div
          className={cx(
            "p-2 border border-blue-400 text-blue-400 cursor-pointer rounded",
            ordering === "price" && "bg-blue-400 text-white cursor-default",
          )}
          onClick={() => setOrdering("price")}
        >
          Min Price
        </div>
        <div
          className={cx(
            "p-2 border border-blue-400 text-blue-400 cursor-pointer rounded",
            ordering === "name" && "bg-blue-400 text-white cursor-default",
          )}
          onClick={() => setOrdering("name")}
        >
          Name ASC
        </div>
        <div
          className={cx(
            "p-2 border border-blue-400 text-blue-400 cursor-pointer rounded",
            ordering === "-name" && "bg-blue-400 text-white cursor-default",
          )}
          onClick={() => setOrdering("-name")}
        >
          Name DESC
        </div>
      </div>
    </div>
  );
};

export default Filters;
