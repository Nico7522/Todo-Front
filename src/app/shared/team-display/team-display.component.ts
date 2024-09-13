import { Component, inject, Input, signal, ViewChild } from '@angular/core';
import { Team } from '../../interfaces/teams/team.interface';
import { TeamService } from '../../services/team/team.service';
import { MatDialog } from '@angular/material/dialog';
import { CompleteTaskDialogComponent } from '../../components/task/task-details/complete-task-dialog/complete-task-dialog.component';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';

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
