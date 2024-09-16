import {
  Component,
  computed,
  inject,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { Team } from '../../interfaces/teams/team.interface';
import { TeamService } from '../../services/team/team.service';
import { MatDialog } from '@angular/material/dialog';
import { CompleteTaskDialogComponent } from '../tasks-display/complete-task-dialog/complete-task-dialog.component';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { filterArray } from '../../utils/methods';
import { TaskAction } from '../../interfaces/tasks/action.type';

@Component({
  selector: 'app-team-display',
  templateUrl: './team-display.component.html',
  styleUrl: './team-display.component.scss',
})
export class TeamDisplayComponent {
  private _teamService = inject(TeamService);
  searchQuery = signal<string>('');
  priority = signal<string>('');
  isComplete = signal<boolean>(false);
  teamMembers = this._teamService.teamMembers;
  teamTasks = this._teamService.teamTasks;
  @Input() team: Team | null = null;

  onTaskUpdated(action: TaskAction) {
    this._teamService.updateTeamTasks(action);
  }

  onTaskUnassigned(action: TaskAction) {
    this._teamService.updateTeamTasks(action);
  }

  filteredTasks = computed(() => {
    const sq = this.searchQuery();
    const priority = this.priority();
    const isComplete = this.isComplete();
    return filterArray(this.teamTasks, sq, priority, isComplete);
  });

  onSearchUpdated(sq: string) {
    this.searchQuery.set(sq);
  }

  onPriorityUpdated(priority: string) {
    this.priority.set(priority);
  }

  onTaskDoneChange(value: boolean) {
    this.isComplete.set(value);
  }
}
