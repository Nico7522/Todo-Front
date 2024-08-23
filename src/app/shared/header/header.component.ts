import {
  Component,
  EventEmitter,
  inject,
  Inject,
  Output,
  Signal,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../components/login/login.component';
import { AuthService } from '../../services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);
  private readonly _authService = inject(AuthService);
  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '400px',
      width: '600px',
    });
  }

  isTokenPresent: Signal<string | null> = this._authService.token;

  @Output() openEmitter = new EventEmitter<boolean>();
  openMenu() {
    this.openEmitter.emit(true);
  }

  logout() {
    this._authService.logout();
  }
}
