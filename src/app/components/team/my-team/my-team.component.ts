import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { TeamService } from '../../../services/team/team.service';
import { Observable } from 'rxjs';
import { Team } from '../../../interfaces/teams/team.interface';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrl: './my-team.component.scss',
})
export class MyTeamComponent {
  private readonly _authService = inject(AuthService);
  private readonly _teamService = inject(TeamService);
  teamId: string | undefined = '';
  team$ = this._teamService.getTeamByUserId(this._authService.user()?.id ?? '');

  ngOnInit() {
    this.teamId = this._authService.user()?.teamId;
  }
}
