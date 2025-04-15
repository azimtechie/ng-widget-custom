import { computed, effect, inject, signal } from '@angular/core';
import { Widget } from '../models/dashboard.model';
import { SubscribersComponent } from '../pages/dashboard/widgets-components/subscribers/subscribers.component';
import { ViewsComponent } from '../pages/dashboard/widgets-components/views/views.component';
import { MatDialog } from '@angular/material/dialog';
import { WidgetDialogComponent } from '../components/widget/widget-dialog/widget-dialog.component';

export class DashboardService {
  constructor() {
    this.fetchWidgets();
  }
  private isEdit = signal(false);
  dialog = inject(MatDialog);
  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Subscribers',
      content: SubscribersComponent,
      rows: 2,
      cols: 2,
      color: 'whitesmoke',
      background: '#003f5c',
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
    },
    {
      id: 3,
      label: 'Views',
      content: ViewsComponent,
      color: 'whitesmoke',
      background: '#003f5c',
    },
    {
      id: 4,
      label: 'Views',
      content: ViewsComponent,
      color: 'whitesmoke',
      background: '#003f5c',
    },
    {
      id: 5,
      label: 'Views',
      content: ViewsComponent,
    },
  ]);

  addedWidgets = signal<Widget[]>([]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((widget) => widget.id);
    return this.widgets().filter((widget) => !addedIds.includes(widget.id));
  });

  fetchWidgets() {
    const widgets = localStorage.getItem('widgets');
    if (widgets) {
      const parsedWidgets = JSON.parse(widgets) as Widget[];
      parsedWidgets.forEach((widget) => {
        const widgetType = this.widgets().find((w) => w.id === widget.id);
        if (widgetType) {
          widget.content = widgetType.content;
        }
      });
      this.addedWidgets.set(parsedWidgets);
    }
  }

  addWidget(widget: Widget) {
    this.addedWidgets.set([...this.addedWidgets(), { ...widget }]);
  }

  updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.addedWidgets().findIndex((widget) => widget.id === id);
    if (index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = { ...newWidgets[index], ...widget };
      this.addedWidgets.set(newWidgets);
    }
  }
  moveWidgetToRight(id: number) {
    const index = this.addedWidgets().findIndex((widget) => widget.id === id);

    if (index !== -1 && index + 1 < this.addedWidgets().length) {
      const newWidgets = [...this.addedWidgets()];
      const temp = newWidgets[index];
      newWidgets[index] = newWidgets[index + 1];
      newWidgets[index + 1] = temp;
      this.addedWidgets.set(newWidgets);
    }
  }
  moveWidgetToLeft(id: number) {
    const index = this.addedWidgets().findIndex((widget) => widget.id === id);
    if (index !== -1 && index - 1 >= 0) {
      const newWidgets = [...this.addedWidgets()];
      const temp = newWidgets[index];
      newWidgets[index] = newWidgets[index - 1];
      newWidgets[index - 1] = temp;
      this.addedWidgets.set(newWidgets);
    }
  }
  removeWidget(id: number) {
    this.addedWidgets.set(
      this.addedWidgets().filter((widgets) => widgets.id !== id)
    );
  }

  updateWidgetPosition(sourceWidgetId: number, targetWidgetId: number) {
    const sourceIndex = this.addedWidgets().findIndex(
      (widget) => widget.id === sourceWidgetId
    );
    if (sourceIndex === -1) return;
    const newWidgets = [...this.addedWidgets()];
    const sourceWidget = newWidgets.splice(sourceIndex, 1)[0];

    const targetIndex = newWidgets.findIndex(
      (widget) => widget.id === targetWidgetId
    );
    if (targetIndex === -1) return;

    const insertAt =
      targetIndex === sourceIndex ? targetIndex + 1 : targetIndex;

    newWidgets.splice(insertAt, 0, sourceWidget);
    this.addedWidgets.set(newWidgets);
  }

  addWidgetAtPosition(sourceWidgetId: number, destWidgetId: number) {
    const widgetsToAdd = this.widgetsToAdd().find(
      (widget) => widget.id === sourceWidgetId
    );
    if (!widgetsToAdd) return;

    const indexOfDestWidget = this.addedWidgets().findIndex(
      (widget) => widget.id === destWidgetId
    );

    const positionToAdd =
      indexOfDestWidget === -1 ? this.addedWidgets().length : indexOfDestWidget;
    const newWidgets = [...this.addedWidgets()];
    newWidgets.splice(positionToAdd, 0, widgetsToAdd);
    this.addedWidgets.set(newWidgets);
  }

  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(
      (widget) => ({ ...widget })
    );
    widgetsWithoutContent.forEach((widget) => {
      delete widget.content;
    });
    localStorage.setItem('widgets', JSON.stringify(widgetsWithoutContent));
  });

  toggleEdit() {
    this.isEdit.update((edit) => !edit);
  }
  isEditMode() {
    return this.isEdit();
  }
  openWidgetModal(widgetId: number) {
    const widget = this.addedWidgets().find((widget) => widget.id === widgetId);
    if (widget) {
      this.dialog.open(WidgetDialogComponent, {
        data: widget,
        maxWidth: '90vw',
        maxHeight: '90vh',
        width: '100%',
        height: '100%',
        panelClass: 'widget-expanded-dialog',
      });
    }
  }
}
