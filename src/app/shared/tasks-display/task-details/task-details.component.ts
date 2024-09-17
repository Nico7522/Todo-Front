import { Component, DestroyRef, Inject, inject, signal } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Error } from '../../../enums/error.enum';
import { CompleteTaskDialogComponent } from '../complete-task-dialog/complete-task-dialog.component';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal.component';
import { TaskModalData } from '../../../interfaces/tasks/task-modal-data.interface';
import { AuthService } from '../../../services/auth/auth.service';
import { TeamService } from '../../../services/team/team.service';
import { TaskAction } from '../../../interfaces/tasks/action.type';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
  providers: [TaskService],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', animate('0.2s', style({ opacity: 0 }))),
    ]),
  ],
})
export class TaskDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskModalData,
    private breakpointObserver: BreakpointObserver
  ) {}
  private readonly _dialogRef = inject(MatDialogRef<TaskDetailsComponent>);
  private readonly _dialog = inject(MatDialog);
  private readonly _taskService = inject(TaskService);
  private readonly _spinnerService = inject(NgxSpinnerService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _authService = inject(AuthService);
  private readonly _teamService = inject(TeamService);
  private readonly _destroyRef = inject(DestroyRef);
  user = this._authService.user;
  isLeader = (this.data.leaderId = this.user()?.id);
  onUpdateMode = signal<boolean>(false);
  horizontalDisplay = signal<boolean>(false);

  task$ = this._taskService.getTaskById(this.data.taskId).pipe(
    catchError((err) => {
      if (err.status === 404) {
        this._toastrService.error(Error.TASKNOTFOUND);
      } else {
        this._toastrService.error(Error.TASKNOTFETCH);
      }
      this._dialogRef.close();
      return EMPTY;
    }),
    finalize(() => this._spinnerService.hide('task-details'))
  );

  openCompleteTaskDialog() {
    let ref = this._dialog.open(CompleteTaskDialogComponent, {
      width: '300px',
      data: this.data,
    });

    ref.afterClosed().subscribe((action: TaskAction) => {
      if (action) {
        this._dialogRef.close(action);
      }
    });
  }

  unassignTaskFromTeam() {
    let ref = this._dialog.open(ConfirmationModalComponent, {
      height: '200px',
      width: '600px',
    });

    ref.afterClosed().subscribe((res) => {
      if (res) {
        this._spinnerService.show('task-details');
        this._teamService
          .unassignTaskFormTeam(this.user()?.teamId ?? '', this.data.taskId)
          .pipe(
            tap(() => {
              this._toastrService.success('Task Unassigned');
              let data: TaskAction = {
                taskId: this.data.taskId,
                action: 'unassign',
              };
              this._dialogRef.close(data);
            }),
            catchError((res) => {
              if (res.status === 403 || res.status === 404) {
                this._toastrService.error(res.status);
              } else {
                this._toastrService.error(Error.SERVERERROR);
              }
              return EMPTY;
            }),
            finalize(() => this._spinnerService.hide('task-details'))
          )
          .subscribe();
      }
    });
  }

  ngOnInit() {
    this._spinnerService.show('task-details');

    this.breakpointObserver
      .observe('(max-width: 520px)')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((res) => {
        if (res.matches) {
          this.horizontalDisplay.set(true);
        } else {
          this.horizontalDisplay.set(false);
        }
      });
  }
}
