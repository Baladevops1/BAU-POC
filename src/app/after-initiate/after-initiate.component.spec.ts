import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterInitiateComponent } from './after-initiate.component';

describe('AfterInitiateComponent', () => {
  let component: AfterInitiateComponent;
  let fixture: ComponentFixture<AfterInitiateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterInitiateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterInitiateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
