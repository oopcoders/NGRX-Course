import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../resources/model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryApiService } from '../resources/category-api.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {
  category$: Observable<Category>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryApiService
  ) {}

  ngOnInit() {
    this.category$ = this.categoryService.getCategory(
      this.route.snapshot.paramMap.get('id')
    );
  }

  deleteCategory(id: number) {
    const categoryObserver = {
      next: () => {
        console.log('Category Deleted');
        this.router.navigate(['/category/list']);
      },
      error: (err) => console.error(err),
    };
    this.categoryService.deleteCategory(id).subscribe(categoryObserver);
  }
}
