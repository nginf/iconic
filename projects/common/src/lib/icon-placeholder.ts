import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIcon } from '../base-icon';

@Component({
  selector: 'app-icon',
  template: `CONTENT`,
  styles: `
    :host {
      display: inline-flex;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent extends BaseIcon {}
