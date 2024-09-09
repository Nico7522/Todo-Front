import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { MaterialModule } from '../../shared/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TasksFilterComponent } from './tasks-filter/tasks-filter.component';
import { CompleteTaskDialogComponent } from './task-details/complete-task-dialog/complete-task-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskComponent,
    MyTasksComponent,
    TaskDetailsComponent,
    TasksFilterComponent,
    CompleteTaskDialogComponent,
  ],
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
