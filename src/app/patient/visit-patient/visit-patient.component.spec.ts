import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitPatientComponent } from './visit-patient.component';

describe('VisitPatientComponent', () => {
  let component: VisitPatientComponent;
  let fixture: ComponentFixture<VisitPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
