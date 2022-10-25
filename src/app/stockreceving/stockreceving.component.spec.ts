import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockrecevingComponent } from './stockreceving.component';

describe('StockrecevingComponent', () => {
  let component: StockrecevingComponent;
  let fixture: ComponentFixture<StockrecevingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockrecevingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockrecevingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
