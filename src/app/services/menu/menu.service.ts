import { effect, Injectable, signal } from '@angular/core';
import { Menu } from '../../interfaces/menu.type';

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

  constructor() {}
}
