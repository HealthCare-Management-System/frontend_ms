import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailsUpdateComponent } from './patient-details-update.component';

describe('PatientDetailsUpdateComponent', () => {
  let component: PatientDetailsUpdateComponent;
  let fixture: ComponentFixture<PatientDetailsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDetailsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
