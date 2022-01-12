import { AuthEffects } from './../../store/effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from '../../store/reducers/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthLinksComponent } from './auth-links/auth-links.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
  declarations: [LoginComponent, AuthLinksComponent],
  imports: [
    CommonModule, AuthRoutingModule, FormsModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [AuthLinksComponent],
})
export class AuthModule { }
