import { TestBed } from '@angular/core/testing';

import { PatientVisitServiceService } from './patient-visit-service.service';

describe('PatientVisitServiceService', () => {
  let service: PatientVisitServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientVisitServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
