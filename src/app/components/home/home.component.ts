import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly _authService = inject(AuthService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  private readonly _dialog = inject(MatDialog);
  errorMessage = signal<string>('');
  constructor() {}

  opendialog() {
    this._dialog.open(LoginComponent, {
      height: '400px',
      width: '600px',
    });
  }

  isTokenExist = this._authService.isTokenExist;

  ngOnInit() {
    if (this._authService.isTokenExist()) {
      this._spinnerService.show('all');
    }
  }

  ngOnDestroy() {}
}
