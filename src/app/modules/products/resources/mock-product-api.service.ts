import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, PaginatedResult } from './product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Injectable({
  providedIn: 'root',
})
export class MockProductApiService {
  /********************************************************************************** */
  // This is a mock service, Don't use examples on this page in production code. Some APIs
  //  might be totally fake, and Some business logic usually handled on the server
  //   will be done on this page. This page is designed to give a back fake data.
  /********************************************************************************** */
  constructor(
    private http: HttpClient,
    private pagination: PaginationService
  ) {}

  baseUrl: string = 'http://localhost:3000/';

  createProduct(model: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'products', model);
  }

  getProducts(url: string): Observable<PaginatedResult<Product[]>> {
    let paginatedResult: PaginatedResult<Product[]> = {
      result: undefined,
      pagination: undefined,
    };
    return this.http
      .get<Product[]>(url, { observe: 'response' })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;

          paginatedResult.pagination = this.pagination.parseReturnedPaginationUrls(
            response.headers.get('Link')
          );
          return paginatedResult;
        })
      );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'products/' + productId);
  }

  editProduct(model: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + 'products/' + model.id, model);
  }

  deleteProduct(productId: string) {
    return this.http.delete(this.baseUrl + 'products/' + productId);
  }
}
