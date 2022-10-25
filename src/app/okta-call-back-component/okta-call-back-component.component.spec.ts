import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OktaCallBackComponentComponent } from './okta-call-back-component.component';

describe('OktaCallBackComponentComponent', () => {
  let component: OktaCallBackComponentComponent;
  let fixture: ComponentFixture<OktaCallBackComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OktaCallBackComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OktaCallBackComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
