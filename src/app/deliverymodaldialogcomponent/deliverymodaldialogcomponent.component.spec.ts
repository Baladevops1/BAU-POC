import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverymodaldialogcomponentComponent } from './deliverymodaldialogcomponent.component';

describe('DeliverymodaldialogcomponentComponent', () => {
  let component: DeliverymodaldialogcomponentComponent;
  let fixture: ComponentFixture<DeliverymodaldialogcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverymodaldialogcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverymodaldialogcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
