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
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
