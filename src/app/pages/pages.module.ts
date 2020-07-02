import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotFoundComponent, HomeComponent, CustomerSupportComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    SharedModule,
    RouterModule,
  ],
})
export class PagesModule {}
