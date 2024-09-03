import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, EMPTY, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { emailRegex, passwordRegex } from '../../utils/regex';
import { hasErrorAndTouched } from '../../utils/validators';
import { Error } from '../../enums/error.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(public dialogRef: MatDialogRef<LoginComponent>) {}
  hide: boolean = true;
  private readonly _authService = inject(AuthService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  hasErrorAndTouched = hasErrorAndTouched;
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(emailRegex),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(passwordRegex),
    ]),
  });

  handleSubmit(): void {
    if (this.loginForm.valid) {
      this._spinnerService.show('login');
      this._authService
        .login(
          this.loginForm.get('email')?.value as string,
          this.loginForm.get('password')?.value as string
        )
        .pipe(
          map(() => {
            this._spinnerService.hide('login'),
              this._toastrService.success('Succefully logged', 'Welcome');
            this.dialogRef.close();
          }),
          catchError((err) => {
            this._spinnerService.hide('login');
            let errorMessage =
              err.status === 400 ? Error.BADCREDENTIALS : Error.SERVERERROR;
            this._toastrService.error(errorMessage, 'Error');
            return EMPTY;
          })
        )
        .subscribe();
    }
  }
}
