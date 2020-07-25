import { Component, OnInit } from '@angular/core';
import * as fromHeaderSelectors from 'src/app/store/selectors/header.selectors';
import { Observable, from } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  vm$: Observable<fromHeaderSelectors.HeaderViewModel>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(
      select(fromHeaderSelectors.selectHeaderViewModel)
    );
  }
}
