import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { ChatComponent } from './chat/chat.component';
import { teamGuard } from '../../guards/team/team.guard';

const routes: Routes = [
  { path: '', component: TeamComponent },
  { path: 'my-team', component: MyTeamComponent },
  {
    path: 'my-team/:teamId/chat',
    canActivate: [teamGuard],
    component: ChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
