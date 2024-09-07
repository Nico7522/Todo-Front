import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable, shareReplay } from 'rxjs';
import { User } from '../../interfaces/users/user.interface';
import { ResetPasswordConfirmForm } from '../../interfaces/forms/resetpasswordconfirm-form.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpClient = inject(HttpClient);
  constructor() {}

  getUserById(userId: string): Observable<User> {
    return this._httpClient.get<User>(`${environment.API_URL}/user/${userId}`);
  }

  resetPassword(email: string): Observable<any> {
    return this._httpClient.post(`${environment.API_URL}/user/resetpassword`, {
      email,
    });
  }

  resetPasswordConfirm(
    form: ResetPasswordConfirmForm,
    userId: string,
    resetToken: string
  ): Observable<any> {
    console.log(form);
    return this._httpClient.post<any>(
      `${environment.API_URL}/user/${userId}/${resetToken}/resetpasswordconfirm`,
      {
        password: form.password,
        passwordConfirm: form.passwordConfirm,
      }
    );
  }
}
