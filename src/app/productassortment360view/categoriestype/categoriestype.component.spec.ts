import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriestypeComponent } from './categoriestype.component';

describe('CategoriestypeComponent', () => {
  let component: CategoriestypeComponent;
  let fixture: ComponentFixture<CategoriestypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriestypeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriestypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
