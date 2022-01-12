import { Component, OnInit } from '@angular/core';
import { User } from '../modules/auth/resources/auth';

import { MockApiCartService } from '../modules/cart/resources/mock-api-cart.service';

import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { browserReload } from '../store/actions/auth.actions';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  constructor(
    private cartService: MockApiCartService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.updateShoppingCart(user.id);

      this.store.dispatch(browserReload({ user: user }));
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
