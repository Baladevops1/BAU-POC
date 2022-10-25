import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAssortmentMetricsComponent } from './product-assortment-metrics.component';

describe('ProductAssortmentMetricsComponent', () => {
  let component: ProductAssortmentMetricsComponent;
  let fixture: ComponentFixture<ProductAssortmentMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAssortmentMetricsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAssortmentMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
