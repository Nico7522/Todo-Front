import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreatedConfirmationComponent } from './account-created-confirmation.component';

describe('AccountCreatedConfirmationComponent', () => {
  let component: AccountCreatedConfirmationComponent;
  let fixture: ComponentFixture<AccountCreatedConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountCreatedConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCreatedConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
