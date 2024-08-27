import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Team } from '../../interfaces/teams/team.interface';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private readonly _httpClient = inject(HttpClient);
  constructor() {}

  getTeamByUserId(userId: string): Observable<Team> {
    return this._httpClient.get<Team>(
      `${environment.API_URL}/user/${userId}/team`
    );
  }
}
