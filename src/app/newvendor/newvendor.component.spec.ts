import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewvendorComponent } from './newvendor.component';

describe('NewvendorComponent', () => {
  let component: NewvendorComponent;
  let fixture: ComponentFixture<NewvendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewvendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewvendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
