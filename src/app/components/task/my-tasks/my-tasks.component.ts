import { Component, computed, Inject, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { catchError, EMPTY, finalize, map, Observable } from 'rxjs';
import { Task } from '../../../interfaces/tasks/task.interface';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../../../shared/tasks-display/task-details/task-details.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Error } from '../../../enums/error.enum';
import { filterArray } from '../../../utils/methods';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.scss',
})
export class MyTasksComponent {
  private readonly _authService = inject(AuthService);
  private readonly _dialog = inject(MatDialog);
  private readonly _userService = inject(UserService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  private readonly _toastrService = inject(ToastrService);
  user = this._authService.user;
  tasks = signal<Task[]>([]);
  errorMessage = signal<string>('');
  searchQuery = signal<string>('');
  priority = signal<string>('');
  isComplete = signal<boolean>(false);
  filteredTasks = computed(() => {
    const sq = this.searchQuery();
    const priority = this.priority();
    const isComplete = this.isComplete();
    return filterArray(this.tasks, sq, priority, isComplete);
  });
  task$ = this._userService.getUserById(this.user()?.id ?? '').pipe(
    map((u) => {
      this.tasks.set(u.tasks);
      return u.tasks;
    }),
    catchError((err) => {
      if (err.status === 404) {
        this._toastrService.error(Error.TASKSNOTFETCH);
        this.errorMessage.set(Error.TASKSNOTFETCH);
      } else {
        this._toastrService.error(Error.SERVERERROR);
        this.errorMessage.set(Error.SERVERERROR);
      }
      return EMPTY;
    }),
    finalize(() => this._spinnerService.hide('all'))
  );
  onSearchUpdated(sq: string) {
    this.searchQuery.set(sq);
  }

  onPriorityUpdated(priority: string) {
    this.priority.set(priority);
  }

  onTaskDoneChange(value: boolean) {
    this.isComplete.set(value);
  }
  displayedColumns: string[] = ['title', 'priority', 'details', 'advancement'];
  onTaskToUpdate(taskId: string) {
    // TODO : faire le update task ici.
    let updatedTasks = this.tasks().map((task) =>
      task.id === taskId ? { ...task, isComplete: true } : task
    );
    this.tasks.set(updatedTasks);
  }

  ngOnInit() {
    this._spinnerService.show('all');
  }
}
