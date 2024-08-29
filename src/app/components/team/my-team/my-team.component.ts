import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { TeamService } from '../../../services/team/team.service';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Team } from '../../../interfaces/teams/team.interface';

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
    this._teamService.userId.set(this._authService.user()?.id ?? '');
  }
}
