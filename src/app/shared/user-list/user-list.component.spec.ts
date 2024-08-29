import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMatTabComponent } from './user-list.component';

describe('UserMatTabComponent', () => {
  let component: UserMatTabComponent;
  let fixture: ComponentFixture<UserMatTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMatTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMatTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
