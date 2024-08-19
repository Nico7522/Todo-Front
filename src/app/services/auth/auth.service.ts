import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environment';
import { map, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { LoggedUser } from '../../interfaces/logged-user.interface';
import { RegisterForm } from '../../interfaces/register-from.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _httpClient = inject(HttpClient);

  constructor() {}
  private token: WritableSignal<string | null> = signal(
    localStorage.getItem('token')
  );
  isLogged = this.token.asReadonly();
  login(email: string, password: string): Observable<{ token: string }> {
    return this._httpClient
      .post<{ token: string }>(`${environment.API_URL}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((res) => {
          localStorage.setItem('token', res.token);
          this.token.set(res.token);
          return res;
        })
      );
  }

  register(form: RegisterForm): Observable<any> {
    console.log(form);

    return this._httpClient.post(`${environment.API_URL}/auth/register`, form);
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
  }

  decodeToken(): LoggedUser {
    let token: string = localStorage.getItem('token') ?? '';
    let jwt: any;
    if (token !== '') {
      jwt = jwt_decode.jwtDecode(token);
    }
    return {
      id: jwt[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ],

      role: jwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      email:
        jwt[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        ],
    };
  }
}
