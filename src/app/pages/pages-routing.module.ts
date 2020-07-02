import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'support', component: CustomerSupportComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
