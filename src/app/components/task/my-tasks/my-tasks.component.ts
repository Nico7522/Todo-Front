import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.scss',
})
export class MyTasksComponent {
  private readonly _authService = inject(AuthService);

  private readonly _userService = inject(UserService);
  user = this._authService.user;
  task$ = this._userService
    .getUserById(this.user()?.id ?? '')
    .pipe(map((u) => u.tasks));
}
