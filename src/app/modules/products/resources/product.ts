export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  quantity: number;
}
export interface PriceFilter {
  name: string;
  value: string;
  min: string;
  max: string;
}

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

export interface PaginationParams {
  pricemin: string;
  pricemax: string;
  page: string;
  limit: string;
  url: string;
}

export var paginationParamsModel: PaginationParams = {
  pricemin: '0',
  pricemax: '999',
  page: '1',
  limit: '9',
  url: null,
};
