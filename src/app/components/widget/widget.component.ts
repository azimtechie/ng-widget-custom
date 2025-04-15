import { Component, inject, input, signal } from '@angular/core';
import { Widget } from '../../models/dashboard.model';
import { NgComponentOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { WidgetOptionsComponent } from './widget-options/widget-options.component';
import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-widget',
  imports: [
    NgComponentOutlet,
    MatButtonModule,
    MatIcon,
    WidgetOptionsComponent,
    CdkDrag,
    CdkDragPlaceholder,
  ],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css',
  host: {
    '[style.grid-area]':
      '"span "+(data().rows ?? 1) + "/span "+(data().cols ?? 1)',
  },
})
export class WidgetComponent {
  data = input.required<Widget>();
  showOptions = signal(false);
  store = inject(DashboardService)
}
