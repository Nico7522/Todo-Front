import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private readonly _httpClient = inject(HttpClient);
  constructor() {}

  getTeamByUserId() {}
}
