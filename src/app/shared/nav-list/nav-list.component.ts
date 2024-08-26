import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../components/login/login.component';
import { LogoutConfirmationComponent } from '../../components/logout-confirmation/logout-confirmation.component';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss',
})
export class NavListComponent {
  private readonly _authService = inject(AuthService);
  readonly dialog = inject(MatDialog);
  openDialog() {
    this.dialog.open(LoginComponent, {
      height: '400px',
      width: '600px',
    });
  }
  isTokenExist = this._authService.isTokenExist;

  openLogoutConfirmationDialog() {
    this._authService.openLogoutConfirmationDialog();
  }
}
