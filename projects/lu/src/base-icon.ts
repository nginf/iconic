import {
  Directive,
  effect,
  ElementRef,
  HostAttributeToken,
  inject,
  input,
} from '@angular/core';

const INITIAL_SIZE = 24;

function coerceCssPixelValue(value: any): string {
  if (value == null) {
    return '';
  }

  return typeof value === 'string' ? value : `${value}px`;
}

@Directive()
export class BaseIcon {
  stretch = input(false);
  size = input<number | string>(INITIAL_SIZE);

  private element = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>)
    .nativeElement;

  get icon() {
    return this.element.children[0] as SVGElement;
  }

  constructor() {
    const ariaHidden = inject(new HostAttributeToken('aria-hidden'), {
      optional: true,
    });
    const ariaRole = inject(new HostAttributeToken('role'), {
      optional: true,
    });
    // If the user has not explicitly set aria-hidden, mark the icon as hidden, as this is
    // the right thing to do for the majority of icon use-cases.
    if (!ariaHidden) {
      this.element.setAttribute('aria-hidden', 'true');
    }

    if (!ariaRole) {
      this.element.setAttribute('role', 'img');
    }

    effect(() => {
      const icon = this.icon;
      if (!icon) {
        return;
      }
      if (this.stretch()) {
        icon.setAttribute('width', '100%');
        icon.setAttribute('height', '100%');
      } else {
        const coerceWdth = coerceCssPixelValue(this.size());
        const coerceHeight = coerceCssPixelValue(this.size());
        icon.setAttribute('width', coerceWdth);
        icon.setAttribute('height', coerceHeight);
      }
    });
  }
}
