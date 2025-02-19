import { Directive, effect } from '@angular/core';
import { CommonIcon } from '../../common/src/public-api';

@Directive()
export class BaseIcon extends CommonIcon {
  constructor() {
    super();

    effect(() => {
      const icon = this.icon;
      icon.setAttribute('fill', 'currentColor');
    });
  }
}
