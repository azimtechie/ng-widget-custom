import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget.component';
import { DashboardService } from '../../services/dashboard.service';
import { ThemeService } from '../../services/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { wrapGrid } from 'animate-css-grid';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { WidgetPanelComponent } from './widget-panel/widget-panel.component';
@Component({
  selector: 'app-dashboard',
  imports: [
    WidgetComponent,
    MatButtonModule,
    MatIcon,
    MatMenuModule,
    CdkDropList,
    CdkDropListGroup,
    CdkDrag,
    CdkDragPlaceholder,
    WidgetPanelComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnInit() {
    const { unwrapGrid } = wrapGrid(this.dashboard().nativeElement, {
      duration: 300,
    });
    this.clearAnimation = unwrapGrid;
  }
  clearAnimation = () => {};
  dashboard = viewChild.required<ElementRef>('dashboard');
  store = inject(DashboardService);
  themeService = inject(ThemeService);
  widgetsOpen = signal(false);

  ngOnDestroy(): void {
    this.clearAnimation();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }


  drop(event: CdkDragDrop<any, any>) {
    const {
      previousContainer,
      container,
      item: { data },
    } = event;

    if (data) {
      console.log(data);
      this.store.addWidgetAtPosition(data, container.data);
      return;
    }

    this.store.updateWidgetPosition(previousContainer.data, container.data);
  }
}
