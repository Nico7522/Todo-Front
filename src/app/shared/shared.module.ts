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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountCreatedConfirmationComponent } from './account-created-confirmation/account-created-confirmation.component';
import { TeamDisplayComponent } from './team-display/team-display.component';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TaskExpensionPanelComponent } from './task-expension-panel/task-expension-panel.component';
import { ErrorAlertComponent } from './error-alert/error-alert.component';
import { PriorityPipe } from '../pipes/priority/priority.pipe';
import { ListItemMetaComponent } from './team-display/list-item-meta/list-item-meta.component';
import { DeleteTaskConfirmationModalComponent } from './delete-task-confirmation-modal/delete-task-confirmation-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavListComponent,
    InputPhoneComponent,
    AccountCreatedConfirmationComponent,
    TeamDisplayComponent,
    UserListComponent,
    SideMenuComponent,
    TaskExpensionPanelComponent,
    ErrorAlertComponent,
    PriorityPipe,
    ListItemMetaComponent,
    DeleteTaskConfirmationModalComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    NavListComponent,
    InputPhoneComponent,
    TeamDisplayComponent,
    UserListComponent,
    SideMenuComponent,
    TaskExpensionPanelComponent,
    ErrorAlertComponent,
    PriorityPipe,
    FormsModule,
  ],
})
export class SharedModule {}
