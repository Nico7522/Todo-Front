import { Component, inject, Input } from '@angular/core';
import { Team } from '../../interfaces/teams/team.interface';
import { TeamService } from '../../services/team/team.service';

@Component({
  selector: 'app-team-display',
  templateUrl: './team-display.component.html',
  styleUrl: './team-display.component.scss',
})
export class TeamDisplayComponent {
  private _teamService = inject(TeamService);

  teamMembers = this._teamService.teamMembers;
  @Input() team: Team | null = null;
}
