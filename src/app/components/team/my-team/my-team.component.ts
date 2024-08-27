import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { TeamService } from '../../../services/team/team.service';
import { catchError, EMPTY, Observable } from 'rxjs';
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
  teamId: string | undefined = '';
  team$ = this._teamService
    .getTeamByUserId(this._authService.user()?.id ?? '')
    .pipe(
      catchError(() => {
        this.actualTeamErrorMessage =
          'Team could not be found, please try later';
        return EMPTY;
      })
    );
  oldTeam$ = this._teamService
    .getOldTeamByUser(this._authService.user()?.id ?? '')
    .pipe(
      catchError((err) => {
        console.log(err);

        this.oldTeamErrorMessage = 'Teams could not be found, please try later';
        return EMPTY;
      })
    );

  ngOnInit() {
    this.teamId = this._authService.user()?.teamId;
  }
}
