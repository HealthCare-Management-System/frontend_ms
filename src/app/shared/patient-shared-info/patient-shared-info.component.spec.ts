import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSharedInfoComponent } from './patient-shared-info.component';

describe('PatientSharedInfoComponent', () => {
  let component: PatientSharedInfoComponent;
  let fixture: ComponentFixture<PatientSharedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSharedInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSharedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
