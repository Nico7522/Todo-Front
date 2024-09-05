import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';

const routes: Routes = [
  { path: '', component: TaskComponent },
  { path: 'my-tasks', component: MyTasksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
