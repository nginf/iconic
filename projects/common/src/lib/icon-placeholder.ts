import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIcon } from '../base-icon';

@Component({
  selector: 'app-icon',
  template: `CONTENT`,
  standalone: true,
  styles: `
    :host {
      display: inline-flex;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent extends BaseIcon {}
