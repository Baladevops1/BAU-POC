import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicktodosComponent } from './quicktodos.component';

describe('QuicktodosComponent', () => {
  let component: QuicktodosComponent;
  let fixture: ComponentFixture<QuicktodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuicktodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuicktodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
