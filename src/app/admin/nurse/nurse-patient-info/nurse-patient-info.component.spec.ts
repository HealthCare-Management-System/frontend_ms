import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursePatientInfoComponent } from './nurse-patient-info.component';

describe('NursePatientInfoComponent', () => {
  let component: NursePatientInfoComponent;
  let fixture: ComponentFixture<NursePatientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursePatientInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NursePatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
