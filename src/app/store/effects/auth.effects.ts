import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/app/modules/auth/resources/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginPage, AuthActions.loginModal),
      concatMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((user) => AuthActions.loginSuccess({ user: user })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private authService: AuthService) {}
}
