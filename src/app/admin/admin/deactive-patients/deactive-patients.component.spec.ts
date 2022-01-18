import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivePatientsComponent } from './deactive-patients.component';

describe('DeactivePatientsComponent', () => {
  let component: DeactivePatientsComponent;
  let fixture: ComponentFixture<DeactivePatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivePatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
