import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../auth/resources/admin.guard';
import { CategoryItemComponent } from './category-item/category-item.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

const routes: Routes = [
  {
    path: 'list',
    canActivate: [AdminGuard],
    component: CategoryListComponent,
  },
  {
    path: 'add',
    canActivate: [AdminGuard],
    component: CategoryAddComponent,
  },
  {
    path: 'item/:id',
    canActivate: [AdminGuard],
    component: CategoryItemComponent,
  },
  {
    path: 'edit/:id',
    canActivate: [AdminGuard],
    component: CategoryEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
