import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcrecevingComponent } from './idcreceving.component';

describe('IdcrecevingComponent', () => {
  let component: IdcrecevingComponent;
  let fixture: ComponentFixture<IdcrecevingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdcrecevingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcrecevingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
