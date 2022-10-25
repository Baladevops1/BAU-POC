import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdctransferComponent } from './idctransfer.component';

describe('IdctransferComponent', () => {
  let component: IdctransferComponent;
  let fixture: ComponentFixture<IdctransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdctransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdctransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
