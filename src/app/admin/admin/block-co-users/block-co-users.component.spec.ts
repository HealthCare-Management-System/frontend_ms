import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCoUsersComponent } from './block-co-users.component';

describe('BlockCoUsersComponent', () => {
  let component: BlockCoUsersComponent;
  let fixture: ComponentFixture<BlockCoUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockCoUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
