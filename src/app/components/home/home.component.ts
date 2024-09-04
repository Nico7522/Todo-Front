import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly _authService = inject(AuthService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  errorMessage = signal<string>('');
  constructor() {}

  isTokenExist = this._authService.isTokenExist;

  ngOnInit() {
    if (this._authService.isTokenExist()) {
      this._spinnerService.show('all');
    }
  }

  ngOnDestroy() {}
}
