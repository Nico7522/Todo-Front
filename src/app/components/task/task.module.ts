import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { MaterialModule } from '../../shared/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CompleteTaskDialogComponent } from '../../shared/tasks-display/complete-task-dialog/complete-task-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskComponent, MyTasksComponent, CompleteTaskDialogComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MaterialModule,
    SharedModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
  ],
})
export class TaskModule {}
