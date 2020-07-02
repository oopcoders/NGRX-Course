import { Component, OnInit } from '@angular/core';
import { AuthService } from '../resources/auth.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';
import { MockApiCartService } from '../../cart/resources/mock-api-cart.service';
import { User } from '../resources/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private route: Router,
    private cartService: MockApiCartService
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
    this.spinner.show();
    this.alertService.info('Checking your information...');
    const observer = {
      next: (user) => {
        this.user = user;

        this.updateShoppingCart(this.user.id);

        this.authService.updatedUserSelection(this.user);
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
}
