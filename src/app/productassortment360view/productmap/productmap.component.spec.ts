import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmapComponent } from './productmap.component';

describe('ProductmapComponent', () => {
  let component: ProductmapComponent;
  let fixture: ComponentFixture<ProductmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
