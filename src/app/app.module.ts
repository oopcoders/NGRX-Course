import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CoreComponent } from './core/core.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-alerts';
import { AuthModule } from './modules/auth/auth.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CartModule } from './modules/cart/cart.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { CustomerSupportEffects } from './store/effects/customer-support.effects';
import { SpinnerEffects } from './store/effects/spinner.effects';
import { AlertEffects } from './store/effects/alert.effects';
import { RouteEffects } from './store/effects/route.effects';
import { ModalEffects } from './store/effects/modal.effects';
import { AppEffects } from './store/effects/app.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    TopBarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxSpinnerModule,
    RouterModule,
    AuthModule,
    FormsModule,
    CartModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: 'right' }),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      CustomerSupportEffects,
      SpinnerEffects,
      AlertEffects,
      RouteEffects,
      ModalEffects,
      AppEffects,
    ]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
