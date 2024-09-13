import { Component, effect, inject, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuService } from './services/menu/menu.service';
import { AuthService } from './services/auth/auth.service';
import { isTokenExpiress } from './utils/methods';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _menuService = inject(MenuService);
  private readonly _authService = inject(AuthService);
  private readonly _toastrService = inject(ToastrService);

  @ViewChild('menu') menu!: MatSidenav;
  @ViewChild('principalMenu') principalMenu!: MatSidenav;

  constructor() {
    effect(() => {
      if (this._menuService.isMenuOpen()) {
        this.menu.open();
      } else {
        this.menu.close();
        this.principalMenu.close();
      }

      if (this._menuService.closePrincipalMenu()) {
        this.principalMenu.close();
      }
    });
    const user = this._authService.user();
    if (user && isTokenExpiress(user.tokenExp)) {
      this._authService.disconnectUser();
      this._toastrService.error('Relog please');
    }
  }
  togglePrincipalMenu() {
    this.principalMenu.toggle();
  }
}
