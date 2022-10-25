import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockrecevingdialogComponent } from './stockrecevingdialog.component';

describe('StockrecevingdialogComponent', () => {
  let component: StockrecevingdialogComponent;
  let fixture: ComponentFixture<StockrecevingdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockrecevingdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockrecevingdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
