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

@NgModule({
  declarations: [HeaderComponent, NavListComponent, InputPhoneComponent, AccountCreatedConfirmationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, NavListComponent, InputPhoneComponent],
})
export class SharedModule {}
