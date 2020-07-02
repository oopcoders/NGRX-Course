import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartButtonWidgetComponent } from './cart-button-widget/cart-button-widget.component';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartLinkWidgetComponent } from './cart-link-widget/cart-link-widget.component';

@NgModule({
  declarations: [
    CartComponent,
    CartButtonWidgetComponent,
    CartLinkWidgetComponent,
  ],
  imports: [CommonModule, CartRoutingModule],
  exports: [CartButtonWidgetComponent, CartLinkWidgetComponent],
})
export class CartModule {}
