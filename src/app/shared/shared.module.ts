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
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { TasksDisplayComponent } from './tasks-display/tasks-display.component';
import { TaskModule } from '../components/task/task.module';
import { TasksFilterComponent } from './tasks-filter/tasks-filter.component';
import { TaskDetailsComponent } from './tasks-display/task-details/task-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    ConfirmationModalComponent,
    TasksDisplayComponent,
    TasksFilterComponent,
    TaskDetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgxSpinnerModule,
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
    TasksDisplayComponent,
    TasksFilterComponent,
    TaskDetailsComponent,
  ],
})
export class SharedModule {}
