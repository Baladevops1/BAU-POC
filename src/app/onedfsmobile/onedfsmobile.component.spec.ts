import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnedfsmobileComponent } from './onedfsmobile.component';

describe('OnedfsmobileComponent', () => {
  let component: OnedfsmobileComponent;
  let fixture: ComponentFixture<OnedfsmobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnedfsmobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnedfsmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
