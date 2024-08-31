import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { TeamService } from '../../../services/team/team.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrl: './my-team.component.scss',
})
export class MyTeamComponent {
  private readonly _authService = inject(AuthService);
  private readonly _teamService = inject(TeamService);
  actualTeamErrorMessage: string = '';
  oldTeamErrorMessage: string = '';
  teamId = this._authService.user()?.teamId;
  team = this._teamService.team;
  ngOnInit() {
    console.log(this._authService.user()?.id);

    this._teamService.userId.set(this._authService.user()?.id ?? '');
  }
}
