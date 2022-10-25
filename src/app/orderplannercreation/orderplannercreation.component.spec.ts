import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderplannercreationComponent } from './orderplannercreation.component';

describe('OrderplannercreationComponent', () => {
  let component: OrderplannercreationComponent;
  let fixture: ComponentFixture<OrderplannercreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderplannercreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderplannercreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
