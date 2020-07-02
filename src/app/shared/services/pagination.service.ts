import { Injectable } from '@angular/core';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor() {}

  pagination: Pagination = {
    first: null,
    next: null,
    last: null,
    prev: null,
  };

  parseReturnedPaginationUrls(data): Pagination {
    var linkRegex = /\<([^>]+)/g;
    var relRegex = /rel="([^"]+)/g;
    var linkArray = [];
    var relArray = [];
    var finalResult: Pagination = this.pagination;
    var temp;
    while ((temp = linkRegex.exec(data)) != null) {
      linkArray.push(temp[1]);
    }
    while ((temp = relRegex.exec(data)) != null) {
      relArray.push(temp[1]);
    }

    finalResult = relArray.reduce((object, value, index) => {
      object[value] = linkArray[index];
      return object;
    }, {});

    return finalResult;
  }

  createUrl(
    pricemin = '0',
    pricemax = '999',
    page = '1',
    limit = '9',
    baseurl
  ): string {
    var prepend = '';
    //var query = this.baseUrl + 'products?';
    var query = baseurl;
    if (pricemin) {
      query = `${query}` + prepend + `price_gte=${pricemin}`;
      prepend = '&';
    }
    if (pricemax) {
      query = `${query}` + prepend + `price_lte=${pricemax}`;
      prepend = '&';
    }
    if (page) {
      query = `${query}` + prepend + `_page=${page}`;
      prepend = '&';
    }
    if (page) {
      query = `${query}` + prepend + `_limit=${limit}`;
      prepend = '&';
    }

    query = `${query}` + prepend + `_sort=price`;

    return query;
  }
}
