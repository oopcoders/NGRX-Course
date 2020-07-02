import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryApiService } from '../resources/category-api.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryApiService
  ) {}
  model: any = {};

  ngOnInit() {
    this.categoryService
      .getCategory(this.route.snapshot.paramMap.get('id'))
      .subscribe((category) => (this.model = category));
  }

  onSubmit() {
    const categoryObserver = {
      next: (category) => {
        this.router.navigate(['/category/list']), console.log('success');
      },
      error: (err) => console.error(err),
    };
    console.log(this.model);
    this.categoryService.editCategory(this.model).subscribe(categoryObserver);
  }
}
