import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLinksComponent } from './auth-links.component';

describe('AuthLinksComponent', () => {
  let component: AuthLinksComponent;
  let fixture: ComponentFixture<AuthLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
