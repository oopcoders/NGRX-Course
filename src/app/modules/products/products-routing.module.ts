import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { AuthGuard } from '../auth/resources/auth.guard';
import { AdminGuard } from '../auth/resources/admin.guard';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  {
    path: 'product-item/:id',
    canActivate: [AdminGuard],
    component: ProductItemComponent,
  },
  {
    path: 'product-add',
    canActivate: [AdminGuard],
    component: ProductAddComponent,
  },
  {
    path: 'product-edit/:id',
    canActivate: [AdminGuard],
    component: ProductEditComponent,
  },
  {
    path: 'product-list',
    canActivate: [AdminGuard],
    component: ProductListComponent,
  },
  {
    path: 'product-view/:id',
    component: ProductViewComponent,
  },
  {
    path: 'cart',
    loadChildren: () => import('../cart/cart.module').then((m) => m.CartModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
