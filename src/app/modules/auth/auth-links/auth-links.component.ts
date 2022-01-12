import { Component, OnInit } from '@angular/core';
import { AuthService } from '../resources/auth.service';
import * as fromAuthModels from '../resources/auth';
import { ModalService } from '../resources/modal.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

import * as fromAuthSelectors from 'src/app/store/selectors/auth.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-auth-links',
  templateUrl: './auth-links.component.html',
  styleUrls: ['./auth-links.component.scss'],
})
export class AuthLinksComponent implements OnInit {
  vm$: Observable<fromAuthSelectors.AuthLinksViewModal>;
  constructor(
    public authService: AuthService,
    private modalService: ModalService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );
  }

  logout() {
    this.store.dispatch(logout());
  }

  openModal() {
    this.modalService.show(LoginModalComponent);
  }
}
