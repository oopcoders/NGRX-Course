import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modules/auth/resources/auth';

export const loginPage = createAction(
  '[Login Component] Login User',
  props<{ username: string; password: string }>()
);

export const loginModal = createAction(
  '[Login Modal Component] Login User',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth Effect] Login User Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth Effect] Login User Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Auth Links Component] Logout User');

export const browserReload = createAction(
  '[Core Component] Browser Reload',
  props<{ user: User }>()
);
