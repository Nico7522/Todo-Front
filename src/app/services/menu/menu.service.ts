import { Injectable, signal } from '@angular/core';
import { Menu } from '../../interfaces/menu/menu.type';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _isMenuOpen = signal<boolean>(false);
  isMenuOpen = this._isMenuOpen.asReadonly();
  setIsMenuOpen(state: boolean) {
    this._isMenuOpen.set(state);
  }
  private _openedMenu = signal<Menu>('Team');
  openedMenu = this._openedMenu.asReadonly();

  setOpenedMenu(menuType: Menu) {
    this._openedMenu.set(menuType);
  }

  private _closePrincipalMenu = signal<boolean>(false);
  closePrincipalMenu = this._closePrincipalMenu.asReadonly();

  setClosePrincipalMenu() {
    this._closePrincipalMenu.set(true);
    this._closePrincipalMenu.set(false);
  }

  constructor() {}
}
