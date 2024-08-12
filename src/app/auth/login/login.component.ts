import { Component, inject, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(public dialogRef: MatDialogRef<LoginComponent>) {}

  private readonly _authService = inject(AuthService);
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
        .subscribe((res) => console.log(res));
    }
  }
}
