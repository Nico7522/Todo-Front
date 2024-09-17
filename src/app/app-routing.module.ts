import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountConfirmationComponent } from './components/auth/account-confirmation/account-confirmation.component';
import { authGuard } from './guards/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordConfirmComponent } from './components/auth/reset-password-confirm/reset-password-confirm.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TaskDetailsComponent } from './shared/tasks-display/task-details/task-details.component';
import { TestanimComponent } from './components/testanim/testanim.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'test',
    component: TestanimComponent,
  },
  {
    path: 'team',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/team/team.module').then((m) => m.TeamModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./components/task/task.module').then((m) => m.TaskModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
