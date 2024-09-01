import { Component, effect, inject, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MenuService } from '../../services/menu/menu.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  private readonly _menuService = inject(MenuService);
  private readonly _authService = inject(AuthService);
  teamId = this._authService.user()?.teamId;
  openedMenu = this._menuService.openedMenu;
  closeMenu() {
    this._menuService.setIsMenuOpen(false);
  }
}
