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

@NgModule({
  declarations: [TaskComponent, MyTasksComponent, TaskDetailsComponent, TasksFilterComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MaterialModule,
    SharedModule,
    NgxSpinnerModule,
  ],
})
export class TaskModule {}
