import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from '../app-routing.module';
import { NavListComponent } from './nav-list/nav-list.component';
import {
  InputPhoneComponent,
  MyTel,
} from './input-phone/input-phone.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountCreatedConfirmationComponent } from './account-created-confirmation/account-created-confirmation.component';
import { TeamDisplayComponent } from './team-display/team-display.component';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavListComponent,
    InputPhoneComponent,
    AccountCreatedConfirmationComponent,
    TeamDisplayComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    NavListComponent,
    InputPhoneComponent,
    TeamDisplayComponent,
    UserListComponent,
  ],
})
export class SharedModule {}
