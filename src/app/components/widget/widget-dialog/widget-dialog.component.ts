import { NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-widget-dialog',
  imports: [MatDialogModule, NgComponentOutlet, MatIconModule, MatButtonModule],
  templateUrl: './widget-dialog.component.html',
  styleUrl: './widget-dialog.component.css',
})
export class WidgetDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<WidgetDialogComponent>);
}
