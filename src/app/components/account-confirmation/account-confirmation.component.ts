import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, map } from 'rxjs';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrl: './account-confirmation.component.scss',
})
export class AccountConfirmationComponent {
  private readonly _authService = inject(AuthService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  isConfirmed: boolean = false;
  isLoading: boolean = true;
  message: string = 'Checking ...';
  ngOnInit() {
    let userId = this._activatedRoute.snapshot.queryParamMap.get('userId');
    let token = this._activatedRoute.snapshot.queryParamMap.get('token');
    if (userId && token) {
      this._authService
        .confirmAccount(userId, token)
        .pipe(
          map(() => {
            this.isLoading = false;

            this.isConfirmed = true;
            this.message = 'Account confirmed';
          }),
          catchError((err) => {
            console.log(err);

            this.isLoading = false;
            this.message =
              err.status > 0
                ? 'Account has not been confirmed'
                : 'Server error';
            return EMPTY;
          })
        )
        .subscribe();
    }
  }
}
