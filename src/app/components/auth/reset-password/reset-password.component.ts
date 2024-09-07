import { Component, inject, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { emailRegex } from '../../../utils/regex';
import { hasErrorAndTouched } from '../../../utils/validators';
import { UserService } from '../../../services/user/user.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Error } from '../../../enums/error.enum';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private readonly _userService = inject(UserService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  private readonly _toastrService = inject(ToastrService);
  isSuccess = signal<boolean>(false);
  hasErrorAndTouched = hasErrorAndTouched;
  email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(emailRegex),
  ]);

  sendResetPasswordLink() {
    if (this.email.valid && this.email.value) {
      this._spinnerService.show('all');
      this._userService
        .resetPassword(this.email.value)
        .pipe(
          tap(() => {
            this._toastrService.success('Link send'), this.isSuccess.set(true);
          }),
          catchError((err) => {
            if (err.status === 404) {
              this._toastrService.error('Email not found');
            } else {
              this._toastrService.error(Error.SERVERERROR);
            }
            return EMPTY;
          }),
          finalize(() => this._spinnerService.hide('all'))
        )
        .subscribe();
    }
  }
}
