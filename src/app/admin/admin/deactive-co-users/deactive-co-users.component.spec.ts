import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveCoUsersComponent } from './deactive-co-users.component';

describe('DeactiveCoUsersComponent', () => {
  let component: DeactiveCoUsersComponent;
  let fixture: ComponentFixture<DeactiveCoUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactiveCoUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactiveCoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
