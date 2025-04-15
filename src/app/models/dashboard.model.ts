import { Type } from '@angular/core';

export interface Widget {
  id: number;
  label: string;
  content: Type<unknown>;
  rows?: number;
  cols?: number;
  background?: string;
  color?: string;
}
