import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVisitInfoListComponent } from './patient-visit-info-list.component';

describe('PatientVisitInfoListComponent', () => {
  let component: PatientVisitInfoListComponent;
  let fixture: ComponentFixture<PatientVisitInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientVisitInfoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVisitInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
