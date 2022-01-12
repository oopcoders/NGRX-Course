import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../resources/auth.service';
import { User } from '../resources/auth';
import { Observable } from 'rxjs';
import { MockApiCartService } from '../../cart/resources/mock-api-cart.service';
import { ModalService } from '../resources/modal.service';
import * as fromAuthActions from 'src/app/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  user: User;
  user$: Observable<User>;
  constructor(
    public authService: AuthService,
    private cartService: MockApiCartService,
    private modalService: ModalService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

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
      fromAuthActions.loginModal({
        username: f.value.username,
        password: f.value.password,
      })
    );
  }

  cancel(): void {
    this.modalService.hide();
  }
}
