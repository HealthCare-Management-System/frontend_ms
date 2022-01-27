import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVisitDisplayComponent } from './patient-visit-display.component';

describe('PatientVisitDisplayComponent', () => {
  let component: PatientVisitDisplayComponent;
  let fixture: ComponentFixture<PatientVisitDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientVisitDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVisitDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
