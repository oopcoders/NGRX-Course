import { Component, OnInit } from '@angular/core';
import { AuthService } from '../resources/auth.service';
import { AlertService } from 'ngx-alerts';
import { MockApiCartService } from '../../cart/resources/mock-api-cart.service';
import { Router } from '@angular/router';
import * as fromAuthModels from '../resources/auth';
import { ModalService } from '../resources/modal.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

import * as fromAuthSelectors from 'src/app/store/selectors/auth.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth-links',
  templateUrl: './auth-links.component.html',
  styleUrls: ['./auth-links.component.scss'],
})
export class AuthLinksComponent implements OnInit {
  vm$: Observable<fromAuthSelectors.AuthLinksViewModal>;
  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private cartService: MockApiCartService,
    private router: Router,
    private modalService: ModalService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );
  }

  logout() {
    this.cartService.updatedCartSelection({
      id: null,
      userid: null,
      products: null,
      isCartEmpty: null,
      cartItemsLength: null,
      productsSubtotal: null,
    });
    this.authService.updatedUserSelection(fromAuthModels.UserModel);
    localStorage.removeItem('user');

    this.router.navigate(['/home']);
    this.alertService.danger('You are logged out');

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.alertService.info('Come Back Soon!');
    }, 2000);
  }

  openModal() {
    this.modalService.show(LoginModalComponent);
  }
}
