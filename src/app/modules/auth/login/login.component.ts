import { Component, OnInit } from '@angular/core';
import { AuthService } from '../resources/auth.service';
import { NgForm } from '@angular/forms';
import { MockApiCartService } from '../../cart/resources/mock-api-cart.service';
import { User } from '../resources/auth';
import * as fromAuthActions from 'src/app/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cartService: MockApiCartService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  user: User;

  updateShoppingCart(userid) {
    const observer = {
      next: (cartlist) => {
        this.cartService.updatedCartSelection(cartlist);
      },
      error: (err) => console.error(err),
    };
    this.cartService.getCartByUserId(userid).subscribe(observer);
  }

  onSubmit(f: NgForm) {
    this.store.dispatch(
      fromAuthActions.loginPage({
        username: f.value.username,
        password: f.value.password,
      })
    );
  }
}
