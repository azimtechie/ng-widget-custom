import { Component, inject, input, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DashboardService } from '../../../services/dashboard.service';
import { Widget } from '../../../models/dashboard.model';

@Component({
  selector: 'app-widget-options',
  imports: [MatButtonModule, MatIcon, MatButtonToggleModule],
  templateUrl: './widget-options.component.html',
  styleUrl: './widget-options.component.css',
})
export class WidgetOptionsComponent {
  showOptions = model<boolean>(false);
  store = inject(DashboardService);
  data = input.required<Widget>();
}
