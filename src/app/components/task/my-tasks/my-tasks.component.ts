import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { catchError, EMPTY, finalize, map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task } from '../../../interfaces/tasks/task.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Error } from '../../../enums/error.enum';

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
  filteredTasks = computed(() => {
    const sq = this.searchQuery();
    return this.tasks().filter((x) =>
      x.title.toLowerCase().includes(sq.toLowerCase())
    );
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
  displayedColumns: string[] = ['title', 'priority', 'details', 'advancement'];

  openTaskDetailsDialog(taskId: string) {
    this._dialog.open(TaskDetailsComponent, {
      width: '600px',
      data: taskId,
    });
  }

  ngOnInit() {
    this._spinnerService.show('all');
  }
}
