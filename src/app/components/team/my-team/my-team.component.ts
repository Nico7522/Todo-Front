import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrl: './my-team.component.scss',
})
export class MyTeamComponent {
  private readonly _authService = inject(AuthService);
  teamId: string | undefined = '';
  ngOnInit() {
    this.teamId = this._authService.user()?.teamId;
  }
}
