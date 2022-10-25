import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorytypefilterComponent } from './categorytypefilter.component';

describe('CategorytypefilterComponent', () => {
  let component: CategorytypefilterComponent;
  let fixture: ComponentFixture<CategorytypefilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorytypefilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorytypefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
