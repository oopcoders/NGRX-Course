import { Component, OnInit } from '@angular/core';
import { MockProductApiService } from '../resources/mock-product-api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  constructor(
    private productService: MockProductApiService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    const productObserver = {
      next: (product) => (
        this.router.navigate(['/shopping/product-list']), console.log('success')
      ),
      error: (err) => console.error(err),
    };

    this.productService.createProduct(f.value).subscribe(productObserver);
  }
}
