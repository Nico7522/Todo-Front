import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  handleSubmit(): void {
    if (this.loginForm.valid) {
      this._authService
        .login(
          this.loginForm.get('email')?.value as string,
          this.loginForm.get('password')?.value as string
        )
        .pipe(catchError(() => EMPTY))
        .subscribe(() =>
          this._toastrService.success('Succefully logged', 'Welcome')
        );
    }
  }
}
