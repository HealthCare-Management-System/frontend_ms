import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRequestsComponent } from './approve-requests.component';

describe('AaproveRequestsComponent', () => {
  let component: ApproveRequestsComponent;
  let fixture: ComponentFixture<ApproveRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
