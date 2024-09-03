import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);
  errorMessage: string = '';
  isTokenExist = this._authService.isTokenExist;
  user = this._authService.user;
  user$ = this._userService.getUserById(this.user()?.id ?? '').pipe(
    catchError((err) => {
      this.errorMessage = 'Server error, please try later';
      return EMPTY;
    })
  );
}
