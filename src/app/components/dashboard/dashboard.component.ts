import { Component, computed, inject, Signal, signal } from '@angular/core';
import { catchError, EMPTY, filter, Subject, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { TeamService } from '../../services/team/team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Error } from '../../enums/error.enum';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);
  private readonly _teamService = inject(TeamService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  private readonly _toastrService = inject(ToastrService);
  errorMessage = signal<string>('');
  subject = new Subject<void>();
  constructor() {}

  isTokenExist = this._authService.isTokenExist;
  user = this._authService.user;

  user$ = this.getUserById(this.user()?.id ?? '').pipe(
    tap(() => {
      this._spinnerService.hide('all');
    }),
    catchError((err) => {
      this._spinnerService.hide('all');
      if (!this._toastrService.currentlyActive) {
        if (err.status === 404) {
          this._toastrService.error(Error.USERNOTFOUND);
        } else {
          this._toastrService.error(Error.SERVERERROR);
        }
      }

      return EMPTY;
    })
  );
  team$ = this.user$.pipe(
    switchMap((user) =>
      this.getTeamByUserId(user.id).pipe(
        catchError((err) => {
          if (err.status === 404) {
            this._toastrService.error(Error.TEAMNOTFETCH);
          } else {
            this._toastrService.error(Error.SERVERERROR);
          }
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
}
