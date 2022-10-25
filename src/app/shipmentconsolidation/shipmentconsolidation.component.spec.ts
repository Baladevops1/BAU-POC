import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentconsolidationComponent } from './shipmentconsolidation.component';

describe('ShipmentconsolidationComponent', () => {
  let component: ShipmentconsolidationComponent;
  let fixture: ComponentFixture<ShipmentconsolidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentconsolidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentconsolidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
