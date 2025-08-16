import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Pagination } from "@/types";
import { cx } from "class-variance-authority";

interface PaginationProps {
  pagination?: Pagination;
  setPage: Dispatch<SetStateAction<number | undefined>>;
}

const Pagination: FunctionComponent<PaginationProps> = ({
  pagination,
  setPage,
}) => {
  return (
    <div className="flex items-center justify-center w-full mt-6">
      <div className="flex items-center border border-blue-500 rounded divide-x">
        {Boolean(pagination?.previous) && (
          <div
            className="w-8 h-8 text-blue-600 flex items-center justify-center cursor-pointer"
            onClick={() => setPage(pagination?.page - 1)}
          >
            {pagination?.page - 1}
          </div>
        )}

        <div
          className={cx([
            "w-8 h-8 bg-blue-500 text-white flex items-center justify-center",
            !pagination?.previous && "rounded-l",
            !pagination?.next && "rounded-r",
          ])}
        >
          {pagination?.page}
        </div>
        {Boolean(pagination?.page + 1 < pagination?.total_pages) && (
          <div
            className="w-8 h-8 text-blue-600 flex items-center justify-center cursor-pointer"
            onClick={() => setPage(pagination?.page + 1)}
          >
            {(pagination?.page + 1).toString()}
          </div>
        )}
        {Boolean(pagination?.page + 2 < pagination?.total_pages) && (
          <div
            className="w-8 h-8 text-blue-600 flex items-center justify-center cursor-pointer"
            onClick={() => setPage(pagination?.page + 2)}
          >
            {pagination?.page + 2}
          </div>
        )}
        {Boolean(pagination?.page !== pagination?.total_pages) && (
          <div
            className="w-8 h-8 text-blue-600 flex items-center justify-center cursor-pointer"
            onClick={() => setPage(pagination?.total_pages)}
          >
            {pagination?.total_pages}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
