import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthLinksComponent } from './auth-links/auth-links.component';

@NgModule({
  declarations: [LoginComponent, AuthLinksComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule],
  exports: [AuthLinksComponent],
})
export class AuthModule {}
