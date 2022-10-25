import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productassortment360viewComponent } from './productassortment360view.component';

describe('Productassortment360viewComponent', () => {
  let component: Productassortment360viewComponent;
  let fixture: ComponentFixture<Productassortment360viewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Productassortment360viewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Productassortment360viewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
