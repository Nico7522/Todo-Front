import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable, shareReplay } from 'rxjs';
import { User } from '../../interfaces/users/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpClient = inject(HttpClient);
  constructor() {}

  getUserById(userId: string): Observable<User> {
    return this._httpClient.get<User>(`${environment.API_URL}/user/${userId}`);
  }
}
