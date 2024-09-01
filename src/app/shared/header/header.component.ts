import { Component, EventEmitter, inject, Output, Signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly _authService = inject(AuthService);

  isTokenExist: Signal<string | null> = this._authService.isTokenExist;

  @Output() togglePrincipalMenuEmitter = new EventEmitter<boolean>();
  togglePrincipalMenu() {
    this.togglePrincipalMenuEmitter.emit(true);
  }

  openLogoutConfirmationDialog() {
    this._authService.openLogoutConfirmationDialog();
  }
}
