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

  onTaskUpdated(completedTaskId: string) {
    // let task = this.filteredTasks()?.find((t) => t.id === completedTaskId);
    // if (task) task.isComplete = true;
    this._teamService.updateTeamTasks(completedTaskId);
  }

  filteredTasks = computed(() => {
    const sq = this.searchQuery();
    const priority = this.priority();
    const isComplete = this.isComplete();
    let filter = this.teamTasks().filter(
      (x) =>
        x.title.toLowerCase().includes(sq.toLowerCase()) &&
        x.priority.toString().includes(priority)
    );
    if (isComplete) {
      filter = filter?.filter((x) =>
        isComplete ? x.isComplete === isComplete : x
      );
    }

    return filter;
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
