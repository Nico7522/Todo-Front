import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { TeamService } from '../../services/team/team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Error } from '../../enums/error.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);
  private readonly _teamService = inject(TeamService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  errorMessage = signal<string>('');

  isTokenExist = this._authService.isTokenExist;
  user = this._authService.user;
  user$ = this.getUserById(this.user()?.id ?? '').pipe(
    tap(() => this._spinnerService.hide('all')),
    catchError(() => {
      this._spinnerService.hide('all');
      this.errorMessage.set(Error.SERVERERROR);
      return EMPTY;
    })
  );

  team$ = this.user$.pipe(
    switchMap((user) =>
      this.getTeamByUserId(user.id).pipe(
        catchError(() => {
          this.errorMessage.set(Error.SERVERERROR);
          return EMPTY;
        })
      )
    )
  );

  private getUserById(userId: string) {
    return this._userService.getUserById(userId);
  }

  private getTeamByUserId(userId: string) {
    return this._teamService.getTeamByUserId(userId);
  }

  ngOnInit() {
    this._spinnerService.show('all');
  }
}
