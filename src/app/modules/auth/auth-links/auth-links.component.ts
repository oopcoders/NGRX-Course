import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../resources/auth.service';
import { AlertService } from 'ngx-alerts';
import { MockApiCartService } from '../../cart/resources/mock-api-cart.service';
import { Router } from '@angular/router';
import { User } from '../resources/auth';
import * as fromAuthModels from '../resources/auth';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-auth-links',
  templateUrl: './auth-links.component.html',
  styleUrls: ['./auth-links.component.scss'],
})
export class AuthLinksComponent implements OnInit {
  user: User;
  user$: Observable<User>;
  modalRef: BsModalRef;

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private cartService: MockApiCartService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private route: Router
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
    this.spinner.show();
    this.alertService.info('Checking your information...');
    const observer = {
      next: (user) => {
        this.user = user;

        this.updateShoppingCart(this.user.id);

        this.authService.updatedUserSelection(this.user);
        this.modalRef.hide();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.alertService.success(
            'Welcome Back ' + this.user.username + ' !'
          );
          this.route.navigate(['/shopping/products']);
        }, 1000);
      },
      error: (err) => {
        this.alertService.danger('Unable to login');
        this.spinner.hide();
      },
    };
    this.authService
      .login(f.value.username, f.value.password)
      .subscribe(observer);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  cancel(): void {
    this.modalRef.hide();
  }
}
