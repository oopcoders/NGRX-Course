import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CategoryApiService } from '../resources/category-api.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
})
export class CategoryAddComponent implements OnInit {
  constructor(
    private categoryService: CategoryApiService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    const categoryObserver = {
      next: (category) => (
        this.router.navigate(['/category/list']), console.log('success')
      ),
      error: (err) => console.error(err),
    };

    this.categoryService.createCategory(f.value).subscribe(categoryObserver);
  }
}
