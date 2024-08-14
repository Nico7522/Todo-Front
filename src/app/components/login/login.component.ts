import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, EMPTY, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  handleSubmit(): void {
    if (this.loginForm.valid) {
      this._spinnerService.show();
      this._authService
        .login(
          this.loginForm.get('email')?.value as string,
          this.loginForm.get('password')?.value as string
        )
        .pipe(
          map(() => {
            this._spinnerService.hide(),
              this._toastrService.success('Succefully logged', 'Welcome');
            this.dialogRef.close();
          }),
          catchError((err) => {
            this._spinnerService.hide();
            let errorMessage =
              err.status === 400 ? 'Bad credentials' : 'Server error';
            this._toastrService.error(errorMessage, 'Error');
            return EMPTY;
          })
        )
        .subscribe();
    }
  }
}
