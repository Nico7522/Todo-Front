import { Component, Inject, inject, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../../services/task/task.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Error } from '../../../enums/error.enum';
import { TeamService } from '../../../services/team/team.service';
import { AuthService } from '../../../services/auth/auth.service';
import { TaskModalData } from '../../../interfaces/tasks/task-modal-data.interface';
import { TaskAction } from '../../../interfaces/tasks/action.type';

@Component({
  selector: 'app-complete-task-dialog',
  templateUrl: './complete-task-dialog.component.html',
  styleUrl: './complete-task-dialog.component.scss',
})
export class CompleteTaskDialogComponent {
  private readonly _dialogRef = inject(
    MatDialogRef<CompleteTaskDialogComponent>
  );
  private readonly _taskService = inject(TaskService);
  private readonly _teamService = inject(TeamService);
  private readonly _authService = inject(AuthService);
  private readonly _toastrService = inject(ToastrService);

  isLoading = signal<boolean>(false);
  user = this._authService.user;
  constructor(@Inject(MAT_DIALOG_DATA) public data: TaskModalData) {}

  duration = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.min(1)],
  });
  validate() {
    if (this.duration.valid) {
      this.isLoading.set(true);
      if (this.data.taskInTeam) {
        this.completeTeamTask();
      } else {
        this.completeTask();
      }
    }
  }

  private completeTask() {
    this._taskService
      .completeTask(this.data.taskId, +this.duration.value)
      .pipe(
        tap(() => {
          this._toastrService.success('Task completed');
          let action: TaskAction = {
            taskId: this.data.taskId,
            action: 'complete',
          };
          this._dialogRef.close(action);
        }),
        catchError((err) => {
          if (err.status === 400 || err.status === 403) {
            this._toastrService.error(err.error);
          } else {
            this._toastrService.error(Error.SERVERERROR);
          }
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe();
  }

  private completeTeamTask() {
    this._teamService
      .completeTeamTask(
        this.user()?.teamId ?? '',
        this.data.taskId,
        +this.duration.value
      )
      .pipe(
        tap(() => {
          this._toastrService.success('Task completed');
          let action: TaskAction = {
            taskId: this.data.taskId,
            action: 'complete',
          };
          this._dialogRef.close(action);
        }),
        catchError((err) => {
          if (err.status === 400 || err.status === 403 || err.status === 404) {
            this._toastrService.error(err.error);
          } else {
            this._toastrService.error(Error.SERVERERROR);
          }
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe();
  }
}
