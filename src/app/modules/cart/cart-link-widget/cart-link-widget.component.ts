import { Component, OnInit } from '@angular/core';
import { Cart } from '../resources/cart';
import { MockApiCartService } from '../resources/mock-api-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-link-widget',
  templateUrl: './cart-link-widget.component.html',
  styleUrls: ['./cart-link-widget.component.scss'],
})
export class CartLinkWidgetComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(private cartService: MockApiCartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.cart;
  }
}
