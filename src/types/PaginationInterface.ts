export interface Pagination {
  next: boolean;
  previous: boolean;
  count: number;
  page: number;
  total_pages: number;
  page_size: number;
}

export interface PaginatedRes<T> {
  result: T[];
  pagination: Pagination;
}
