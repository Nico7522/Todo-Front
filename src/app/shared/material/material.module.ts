import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatSidenavContainer,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

const material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatDialogActions,
  MatDialogContent,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavContainer,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatTabsModule,
  CdkMenu,
  CdkMenuItem,
  CdkMenuTrigger,
  MatMenuModule,
  MatExpansionModule,
  MatTableModule,
  MatSelectModule,
  MatCheckboxModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
