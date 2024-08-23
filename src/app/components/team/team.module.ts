import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { MaterialModule } from '../../shared/material/material.module';
import { ChatComponent } from './chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TeamComponent, MyTeamComponent, ChatComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class TeamModule {}
