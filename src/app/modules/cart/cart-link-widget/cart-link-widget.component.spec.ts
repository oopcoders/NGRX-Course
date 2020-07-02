import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLinkWidgetComponent } from './cart-link-widget.component';

describe('CartLinkWidgetComponent', () => {
  let component: CartLinkWidgetComponent;
  let fixture: ComponentFixture<CartLinkWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartLinkWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartLinkWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
