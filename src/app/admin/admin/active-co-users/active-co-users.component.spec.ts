import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCoUsersComponent } from './active-co-users.component';

describe('ActiveCoUsersComponent', () => {
  let component: ActiveCoUsersComponent;
  let fixture: ComponentFixture<ActiveCoUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveCoUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveCoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
