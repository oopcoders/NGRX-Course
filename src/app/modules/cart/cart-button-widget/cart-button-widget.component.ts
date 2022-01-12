import { Component, OnInit, Input } from '@angular/core';
import { MockApiCartService } from '../resources/mock-api-cart.service';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product, Cart } from '../resources/cart';
import { User } from 'src/app/modules/auth/resources/auth';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-cart-button-widget',
  templateUrl: './cart-button-widget.component.html',
  styleUrls: ['./cart-button-widget.component.scss'],
})
export class CartButtonWidgetComponent implements OnInit {
  @Input() product: Product;
  @Input() text: string;

  selectedColor: string = 'primary';
  primaryColor: string = 'success';
  removeColor: string = 'danger';

  cartIconAdd: string = 'fas fa-cart-plus';
  cartIconRemove: string = 'fas fa-shopping-cart';

  icon: string = this.cartIconAdd;
  color: string = this.primaryColor;
  cart: Cart;
  user: User;

  constructor(
    private cartService: MockApiCartService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const observer = {
      next: (user) => {
        this.user = user;
      },
      error: (err) => console.error(err),
    };

    this.store.select((state) => state.auth.user).subscribe(observer);

    if (this.user.id) {
      const observer = {
        next: (cart) => {
          this.cart = cart;
        },
        error: (err) => console.error(err),
      };
      this.cartService.cart.subscribe(observer);
      this.setButtonSettings();
    }
  }

  updateCartApi(): void {
    this.spinner.show();

    const cartObserver = {
      next: (cart) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        this.cartService.updatedCartSelection(cart);
        setTimeout(() => {
          this.alertService.success('Cart Updated');
        }, 1000);
      },
      error: (err) => {
        this.alertService.danger('Unable to Update Shopping Cart');
        this.spinner.hide();
      },
    };

    this.cartService
      .updateCart(this.cart.id, this.cart)
      .subscribe(cartObserver);
  }

  manageCartlist(): void {
    this.color = this.primaryColor;
    this.icon = this.cartIconAdd;

    if (!this.user.id) {
      this.alertService.danger('Please login to add to Shopping Cart');
      return;
    }

    for (let index = 0; index < this.cart.products.length; index++) {
      if (this.cart.products[index].id == this.product.id) {
        this.alertService.info('Removing Product From Shopping Cart');
        this.cart.products.splice(index, 1);
        this.updateCartApi();
        this.setButtonSettings();
        return;
      }
    }
    this.alertService.info('Adding Product To Shopping Cart');
    this.cart.products.push(this.product);
    this.updateCartApi();
    this.setButtonSettings();
  }

  setButtonSettings() {
    if (this.cart.products) {
      for (let index = 0; index < this.cart.products.length; index++) {
        if (this.cart.products[index].id == this.product.id) {
          this.color = this.selectedColor;
          this.icon = this.cartIconRemove;
        }
      }
    }
  }
}
