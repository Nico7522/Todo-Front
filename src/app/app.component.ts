import { Component, effect, inject, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuService } from './services/menu/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _menuService = inject(MenuService);
  @ViewChild('menu') menu!: MatSidenav;
  @ViewChild('principalMenu') principalMenu!: MatSidenav;

  constructor() {
    effect(() => {
      if (this._menuService.isMenuOpen()) {
        this.menu.open();
      } else {
        this.menu.close();
      }
    });
  }
  togglePrincipalMenu() {
    this.principalMenu.toggle();
  }
}
