import { Component, Input } from '@angular/core';
import { Team } from '../../interfaces/teams/team.interface';

@Component({
  selector: 'app-team-display',
  templateUrl: './team-display.component.html',
  styleUrl: './team-display.component.scss',
})
export class TeamDisplayComponent {
  @Input() team: Team | null = null;
}
