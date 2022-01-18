import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmetScheduling1Component } from './appointmet-scheduling1.component';

describe('AppointmetScheduling1Component', () => {
  let component: AppointmetScheduling1Component;
  let fixture: ComponentFixture<AppointmetScheduling1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmetScheduling1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmetScheduling1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
