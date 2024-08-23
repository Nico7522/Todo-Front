import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: TeamComponent },
  { path: 'my-team', component: MyTeamComponent },
  { path: 'my-team/chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
