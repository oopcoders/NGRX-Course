import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';



@Injectable()
export class AuthEffects {

  loadAuths$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AuthActions.loadAuths),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => AuthActions.loadAuthsSuccess({ data })),
          catchError(error => of(AuthActions.loadAuthsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
