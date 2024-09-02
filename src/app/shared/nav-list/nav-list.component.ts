import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../components/login/login.component';
import { MenuService } from '../../services/menu/menu.service';
import { Menu } from '../../interfaces/menu/menu.type';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss',
})
export class NavListComponent {
  private readonly _authService = inject(AuthService);
  menuService = inject(MenuService);
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

  openMenu(menuType: Menu) {
    if (this.menuService.openedMenu() !== menuType) {
      this.menuService.setOpenedMenu(menuType);
      this.menuService.setIsMenuOpen(false);
    }
    let state = this.menuService.isMenuOpen() ? false : true;
    this.menuService.setIsMenuOpen(state);
  }
}
