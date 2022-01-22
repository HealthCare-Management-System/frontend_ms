import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDashboardDisplayComponent } from './patient-dashboard-display.component';

describe('PatientDashboardDisplayComponent', () => {
  let component: PatientDashboardDisplayComponent;
  let fixture: ComponentFixture<PatientDashboardDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDashboardDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDashboardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
