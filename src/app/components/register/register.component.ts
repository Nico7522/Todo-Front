import {
  Component,
  inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { emailRegex, passwordRegex } from '../../utils/regex';
import {
  ConfirmPasswordStateMatcher,
  hasErrorAndTouched,
  HireDateStateMatcher,
  passwordMatch,
  validHireDate,
} from '../../utils/validators';
import {
  InputPhoneComponent,
  MyTel,
} from '../../shared/input-phone/input-phone.component';
import { RegisterForm } from '../../interfaces/forms/register-from.interface';
import { AuthService } from '../../services/auth/auth.service';
import { DatePipe } from '@angular/common';
import { catchError, EMPTY, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AccountCreatedConfirmationComponent } from '../../shared/account-created-confirmation/account-created-confirmation.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  private readonly _dialog = inject(MatDialog);
  markPhoneNumberInputAsTouched: boolean = false;
  passwordFieldHide: boolean = true;
  confirmPasswordFieldHide: boolean = true;
  errorMessage: string = '';
  private readonly _toastrService = inject(ToastrService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  @ViewChild('phoneInput') phoneInput!: InputPhoneComponent;
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _datePipe = inject(DatePipe);
  hasErrorAndTouched = hasErrorAndTouched;
  hireDatematcher = new HireDateStateMatcher();
  passwordMatcher = new ConfirmPasswordStateMatcher();
  registerForm = this._formBuilder.group(
    {
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern(emailRegex)],
      ],
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
      passwordConfirm: [
        '',
        [Validators.required, Validators.pattern(passwordRegex)],
      ],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthdate: ['', Validators.required],
      hiredate: ['', Validators.required],
    },
    {
      validators: [passwordMatch, validHireDate],
      NonNullableFormBuilder,
    }
  );
  cols: number = 2;
  ngOnInit() {
    this.cols = 2;
    this.cols = window.innerWidth >= 1000 ? 2 : 1;
  }

  handleSubmit() {
    if (!this.registerForm.valid) {
      this.markFormAsTouched();
    }
    if (this.registerForm.valid) {
      let tel: MyTel = this.registerForm.get('phoneNumber')
        ?.value as unknown as MyTel;
      let phoneNumber = tel.area + tel.exchange + tel.subscriber + tel.final;
      let birthDate: Date = this.registerForm.get('birthdate')?.value;
      let hireDate: Date = this.registerForm.get('hiredate')?.value;
      const form: RegisterForm = {
        ...this.registerForm.value,
        phoneNumber: phoneNumber,
        birthdate: this._datePipe.transform(birthDate, 'yyyy-MM-dd'),
        hiredate: this._datePipe.transform(hireDate, 'yyyy-MM-dd'),
      };
      this._spinnerService.show('all');
      this.register(form);
    }
  }

  private markFormAsTouched() {
    this.registerForm.markAllAsTouched();
    this.phoneInput.markAsTouched();
  }

  private register(form: RegisterForm) {
    this._authService
      .register(form)
      .pipe(
        map(() => {
          this._spinnerService.hide('all'), this.openDialog();
          this._toastrService.success('Account created');
        }),
        catchError((err) => {
          this.errorMessage =
            err.error === 'Email already exist' ? err.error : 'Server error';
          this._toastrService.error('Error');
          this._spinnerService.hide('all');
          return EMPTY;
        })
      )
      .subscribe();
  }

  private openDialog() {
    this._dialog.open(AccountCreatedConfirmationComponent, {
      width: '600px',
      height: '200px',
      disableClose: true,
    });
  }
}
