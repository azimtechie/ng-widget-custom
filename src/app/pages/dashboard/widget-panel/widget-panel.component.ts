import { Component, inject } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-widget-panel',
  imports: [CdkDropList, MatIcon, CdkDrag, MatButtonModule],
  templateUrl: './widget-panel.component.html',
  styleUrl: './widget-panel.component.css',
})
export class WidgetPanelComponent {
  store = inject(DashboardService);
  widgetPutBack(event: CdkDragDrop<number, any>) {
    const { previousContainer } = event;
    this.store.removeWidget(previousContainer.data);
  }
}
