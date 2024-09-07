import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { passwordRegex } from '../../../utils/regex';
import {
  ConfirmPasswordStateMatcher,
  hasErrorAndTouched,
  passwordMatch,
} from '../../../utils/validators';
import { UserService } from '../../../services/user/user.service';
import { ResetPasswordConfirmForm } from '../../../interfaces/forms/resetpasswordconfirm-form.interface';
import { ActivatedRoute } from '@angular/router';
import HttpParameterCodec, {
  HttpParams,
  HttpUrlEncodingCodec,
} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { Error } from '../../../enums/error.enum';

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrl: './reset-password-confirm.component.scss',
})
export class ResetPasswordConfirmComponent {
  private readonly _userService = inject(UserService);
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _spinnerService = inject(NgxSpinnerService);
  private readonly _toastrService = inject(ToastrService);
  userId: string = '';
  resetToken: string = '';
  hasErrorAndTouched = hasErrorAndTouched;
  passwordFieldHide: boolean = true;
  confirmPasswordFieldHide: boolean = true;
  passwordMatcher = new ConfirmPasswordStateMatcher();
  passwordConfirmForm = this._formBuilder.group(
    {
      password: ['', [Validators.required, Validators.pattern(passwordRegex)]],
      passwordConfirm: [
        '',
        [Validators.required, Validators.pattern(passwordRegex)],
      ],
    },
    {
      validators: [passwordMatch],
    }
  );

  resetPassword() {
    if (this.passwordConfirmForm.valid) {
      this._spinnerService.show('all');
      let form: ResetPasswordConfirmForm = {
        password: this.passwordConfirmForm.getRawValue().password,
        passwordConfirm: this.passwordConfirmForm.getRawValue().passwordConfirm,
      };
      this._userService
        .resetPasswordConfirm(form, this.userId, this.resetToken)
        .pipe(
          tap(() => {
            this._toastrService.success('Password changed');
          }),
          catchError((err) => {
            if (err.status === 404) {
              this._toastrService.error(Error.USERNOTFOUND);
            } else {
              this._toastrService.error('Bad request');
            }
            return EMPTY;
          }),
          finalize(() => this._spinnerService.hide('all'))
        )
        .subscribe();
    }
  }

  ngOnInit() {
    this.userId = this._activatedRoute.snapshot.queryParams['userId'];
    let token: string = this._activatedRoute.snapshot.queryParams['token'];
    this.resetToken = encodeURIComponent(token);
  }
}
