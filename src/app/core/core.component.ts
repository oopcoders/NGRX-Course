import { Component, OnInit } from '@angular/core';
import { User } from '../modules/auth/resources/auth';
import { AuthService } from '../modules/auth/resources/auth.service';

import { MockApiCartService } from '../modules/cart/resources/mock-api-cart.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cartService: MockApiCartService
  ) {}

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.updateShoppingCart(user.id);

      this.authService.updatedUserSelection(user);
    }
  }

  updateShoppingCart(userid) {
    const observer = {
      next: (cart) => {
        this.cartService.updatedCartSelection(cart);
      },
      error: (err) => console.error(err),
    };
    this.cartService.getCartByUserId(userid).subscribe(observer);
  }
}
