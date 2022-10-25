import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nav360Component } from './nav360.component';

describe('Nav360Component', () => {
  let component: Nav360Component;
  let fixture: ComponentFixture<Nav360Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Nav360Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Nav360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
