import { Injectable } from '@angular/core';
import { Category } from './model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {
  constructor(
    private http: HttpClient,
    private pagination: PaginationService
  ) {}

  baseUrl: string = 'http://localhost:3000/categories/';

  createCategory(model: Category) {
    return this.http.post(this.baseUrl, model);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + categoryId);
  }

  editCategory(model: Category): Observable<Category> {
    return this.http.put<Category>(this.baseUrl + model.id, model);
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(this.baseUrl + categoryId);
  }
}
