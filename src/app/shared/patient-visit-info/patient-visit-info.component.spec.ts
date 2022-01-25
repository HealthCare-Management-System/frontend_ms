import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVisitInfoComponent } from './patient-visit-info.component';

describe('PatientVisitInfoComponent', () => {
  let component: PatientVisitInfoComponent;
  let fixture: ComponentFixture<PatientVisitInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientVisitInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVisitInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
