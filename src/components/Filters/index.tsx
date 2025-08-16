import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { cx } from "class-variance-authority";

interface FiltersProps {
  setName: Dispatch<SetStateAction<string>>;
  name: string;
  setActiveView: Dispatch<SetStateAction<"infinite" | "pagination">>;
  activeView: "infinite" | "pagination";
}

const Filters: FunctionComponent<FiltersProps> = ({
  name,
  setName,
  activeView,
  setActiveView,
}) => {
  return (
    <div className="flex justify-between mb-6 text-black w-full rounded-lg">
      <div>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-full w-64 px-2 border border-black/30 rounded placeholder:text-sm outline-0 focus:shadow"
          placeholder="Search..."
        />
      </div>

      <div className="flex items-center">
        <div
          className={cx([
            "p-2 rounded-l transition-all delay-300",
            activeView === "pagination"
              ? "bg-blue-600 text-white cursor-default"
              : "bg-white text-blue-600 cursor-pointer",
          ])}
          onClick={() => setActiveView("pagination")}
        >
          Pagination
        </div>
        <div
          className={cx([
            "p-2 rounded-r transition-all delay-300",
            activeView === "infinite"
              ? "bg-blue-600 text-white cursor-default"
              : "bg-white text-blue-600 cursor-pointer",
          ])}
          onClick={() => setActiveView("infinite")}
        >
          Infinite Scroll
        </div>
      </div>
    </div>
  );
};

export default Filters;
