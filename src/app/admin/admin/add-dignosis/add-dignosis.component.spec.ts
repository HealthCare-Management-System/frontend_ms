import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDignosisComponent } from './add-dignosis.component';

describe('AddDignosisComponent', () => {
  let component: AddDignosisComponent;
  let fixture: ComponentFixture<AddDignosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDignosisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDignosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
