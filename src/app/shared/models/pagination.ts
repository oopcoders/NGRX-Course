export interface Pagination {
  first: string;
  next: string;
  last: string;
  prev: string;
}

export interface PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}
