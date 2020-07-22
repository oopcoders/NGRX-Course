import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../resources/auth.service';
import { AlertService } from 'ngx-alerts';
import { MockApiCartService } from '../../cart/resources/mock-api-cart.service';
import { Router } from '@angular/router';
import { User } from '../resources/auth';
import * as fromAuthModels from '../resources/auth';
import { ModalService } from '../resources/modal.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-auth-links',
  templateUrl: './auth-links.component.html',
  styleUrls: ['./auth-links.component.scss'],
})
export class AuthLinksComponent implements OnInit {
  user: User;

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private cartService: MockApiCartService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => (this.user = user));
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
