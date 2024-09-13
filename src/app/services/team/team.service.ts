import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, filter, Observable, switchMap, tap } from 'rxjs';
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

  private _userId = signal<string>('');
  userId = this._userId.asReadonly();

  team$ = toObservable(this.userId).pipe(
    filter((userId) => userId !== ''),
    switchMap((userId) =>
      this.getTeamByUserId(userId).pipe(
        tap((team) => {
          this._state.set('success');
          this._teamMembers.set(team.users as UserStatus[]);
        }),
        catchError((err) => {
          this._state.set('error');
          return EMPTY;
        })
      )
    )
  );

  team = toSignal(this.team$, {
    initialValue: null,
  });

  getTeamByUserId(userId: string): Observable<Team> {
    return this._httpClient.get<Team>(
      `${environment.API_URL}/user/${userId}/team`
    );
  }

  refreshMembersList(membersList: UserStatus[]) {
    let updatedArray: UserStatus[] = [];

    membersList.forEach((m) => {
      updatedArray = this._teamMembers().map((x) =>
        x.id === m.id
          ? { ...x, isPresent: m.isPresent, isOnline: m.isOnline }
          : x
      );
    });
    this._teamMembers.set(updatedArray);
  }

  setUserId(userId: string) {
    this._userId.set(userId);
  }
}
