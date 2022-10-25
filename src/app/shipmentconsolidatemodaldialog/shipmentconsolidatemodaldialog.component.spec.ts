import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentconsolidatemodaldialogComponent } from './shipmentconsolidatemodaldialog.component';

describe('ShipmentconsolidatemodaldialogComponent', () => {
  let component: ShipmentconsolidatemodaldialogComponent;
  let fixture: ComponentFixture<ShipmentconsolidatemodaldialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentconsolidatemodaldialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentconsolidatemodaldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
