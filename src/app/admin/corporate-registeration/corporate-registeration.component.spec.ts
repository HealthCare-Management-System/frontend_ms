import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateRegisterationComponent } from './corporate-registeration.component';

describe('CorporateRegisterationComponent', () => {
  let component: CorporateRegisterationComponent;
  let fixture: ComponentFixture<CorporateRegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateRegisterationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
