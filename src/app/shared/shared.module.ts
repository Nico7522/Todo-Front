import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from '../app-routing.module';
import { NavListComponent } from './nav-list/nav-list.component';

@NgModule({
  declarations: [HeaderComponent, NavListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
  ],
  exports: [HeaderComponent, NavListComponent],
})
export class SharedModule {}
