import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { AccountConfirmationComponent } from './components/account-confirmation/account-confirmation.component';

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
    loadChildren: () =>
      import('./components/team/team.module').then((m) => m.TeamModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
