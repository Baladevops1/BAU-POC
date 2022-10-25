import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryVarianceComponent } from './inventory-variance.component';

describe('InventoryVarianceComponent', () => {
  let component: InventoryVarianceComponent;
  let fixture: ComponentFixture<InventoryVarianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryVarianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryVarianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
