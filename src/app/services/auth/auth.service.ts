import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environment';
import { map, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { LoggedUser } from '../../interfaces/users/logged-user.interface';
import { RegisterForm } from '../../interfaces/forms/register-from.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationComponent } from '../../components/logout-confirmation/logout-confirmation.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _toastrService = inject(ToastrService);
  readonly dialog = inject(MatDialog);
  private readonly _router = inject(Router);
  constructor() {}
  private _isTokenExist: WritableSignal<string | null> = signal(
    localStorage.getItem('token')
  );
  isTokenExist = this._isTokenExist.asReadonly();

  private _user: WritableSignal<LoggedUser | null> = signal(this.decodeToken());
  user = this._user.asReadonly();
  login(email: string, password: string): Observable<{ token: string }> {
    return this._httpClient
      .post<{ token: string }>(`${environment.API_URL}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((res) => {
          localStorage.setItem('token', res.token);
          this._isTokenExist.set(res.token);
          this._user.set(this.decodeToken());

          return res;
        })
      );
  }

  register(form: RegisterForm): Observable<any> {
    return this._httpClient.post(`${environment.API_URL}/auth/register`, form);
  }

  openLogoutConfirmationDialog() {
    const dialogRef = this.dialog.open(LogoutConfirmationComponent, {
      height: '200px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.logout();
        this._toastrService.success('Disconnected');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this._isTokenExist.set(null);
    this._user.set(null);
    this._router.navigate(['/']);
  }

  disconnectUser() {
    localStorage.removeItem('token');
    this._isTokenExist.set(null);
    this._router.navigate(['/']);
  }

  confirmAccount(userId: string, token: string): Observable<any> {
    const params = new HttpParams().set('userId', userId).set('token', token);

    return this._httpClient.post<any>(
      `${environment.API_URL}/auth/confirmaccount`,
      null,
      {
        params: params,
      }
    );
  }

  decodeToken(): LoggedUser | null {
    let token: string = localStorage.getItem('token') ?? '';
    let jwt: any;
    if (token !== '') {
      jwt = jwt_decode.jwtDecode(token);
      return {
        id: jwt[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ],

        role: jwt[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ],
        email:
          jwt[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
          ],
        teamId: jwt['TeamId'],
        firstname: jwt['Firstname'],
        lastname: jwt['Lastname'],
        tokenExp: jwt['exp'],
      };
    }

    return null;
  }

  showMustLogInAlert() {
    this._toastrService.error('You must be logged');
  }
}
