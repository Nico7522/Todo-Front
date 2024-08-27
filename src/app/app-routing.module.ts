import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { AccountConfirmationComponent } from './components/account-confirmation/account-confirmation.component';
import { authGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'confirmaccount',
    component: AccountConfirmationComponent,
  },
  {
    path: 'team',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/team/team.module').then((m) => m.TeamModule),
  },
  { path: 'task', loadChildren: () => import('./components/task/task.module').then(m => m.TaskModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
