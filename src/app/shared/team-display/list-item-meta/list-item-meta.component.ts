import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { Task } from '../../../interfaces/tasks/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import { CompleteTaskDialogComponent } from '../../../components/task/task-details/complete-task-dialog/complete-task-dialog.component';
import { DeleteTaskConfirmationModalComponent } from '../../delete-task-confirmation-modal/delete-task-confirmation-modal.component';

@Component({
  selector: 'app-list-item-meta',
  templateUrl: './list-item-meta.component.html',
  styleUrl: './list-item-meta.component.scss',
})
export class ListItemMetaComponent {
  @Input() task: Task | null = null;
  @ViewChild('checkbox') checkbox!: MatCheckbox;
  private readonly _dialog = inject(MatDialog);
  completeTask(e: any, taskId: string) {
    let ref = this._dialog.open(CompleteTaskDialogComponent, {
      width: '300px',
      data: taskId,
    });

    ref.afterClosed().subscribe((taskId) => {
      if (!taskId) {
        this.checkbox.checked = false;
      } else {
        if (this.task) this.task.isComplete = true;
      }
    });
  }

  deleteTask() {
    let ref = this._dialog.open(DeleteTaskConfirmationModalComponent, {
      height: '200px',
      width: '600px',
    });

    ref.afterClosed().subscribe((res) => console.log(res));
  }
}
