import { computed, inject, Injectable, signal } from '@angular/core';
import {
  catchError,
  EMPTY,
  Observable,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Team } from '../../interfaces/teams/team.interface';
import { UserStatus } from '../../interfaces/users/user-status.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { State } from '../../interfaces/state/state.type';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private readonly _httpClient = inject(HttpClient);
  constructor() {}
  private _teamMembers = signal<UserStatus[]>([]);
  teamMembers = this._teamMembers.asReadonly();

  private readonly _state = signal<State>('loading');
  state = this._state.asReadonly();

  private readonly _errorMessage = signal<string>('');
  errorMessage = this._errorMessage;

  userId = signal<string>('');

  team = toSignal(
    toObservable(this.userId).pipe(
      switchMap((userId) =>
        this.getTeamByUserId(userId).pipe(
          tap((team) => {
            console.log('appel');
            this._state.set('success');
            this._teamMembers.set(team.users as UserStatus[]);
          }),
          catchError(() => {
            this._state.set('error');
            // this._errorMessage.set('Server error, please try later');
            return EMPTY;
          })
        )
      )
    ),
    { initialValue: null }
  );

  getTeamByUserId(userId: string): Observable<Team> {
    return this._httpClient
      .get<Team>(`${environment.API_URL}/user/${userId}/team`)
      .pipe(shareReplay());
  }

  refreshMembersList(membersList: UserStatus[]) {
    membersList.forEach((u) => {
      let user = this._teamMembers().find((m) => m.id === u.id);
      if (user) {
        user.isOnline = u.isOnline;
      }
    });
  }
}
