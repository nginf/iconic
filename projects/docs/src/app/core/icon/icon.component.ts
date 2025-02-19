import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  Renderer2,
  signal,
  untracked,
} from '@angular/core';

const INITIAL_WIDTH = 24;
const INITIAL_HEIGHT = 24;

function createDomParser() {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    return new DOMParser();
  }
  return null;
}

@Component({
  selector: 'app-icon',
  template: '',
  styles: `
    :host {
      display: inline-flex;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'img',
    '[attr.aria-hidden]': 'true',
  },
})
export class IconComponent {
  stretch = input(false);
  width = input<number | string>(INITIAL_WIDTH);
  height = input<number | string>(INITIAL_HEIGHT);

  private renderer = inject(Renderer2);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  icon = signal<HTMLElement | undefined>(undefined);
  content = input.required<string>();
  private readonly _domParser = createDomParser();

  private stringToSvg(svgString: string) {
    if (!this._domParser) {
      return null;
    }
    const svg = this._domParser.parseFromString(
      svgString,
      'image/svg+xml'
    ).documentElement;

    if (svg.nodeName !== 'svg') {
      return null;
    }

    return svg;
  }

  constructor() {
    effect(() => {
      const content = this.content();
      if (!content) {
        return;
      }
      const icon = this.stringToSvg(content);

      if (!icon) {
        return;
      }
      untracked(() => {
        const existingIcon = this.icon();
        if (existingIcon) {
          this.renderer.removeChild(this.host.nativeElement, existingIcon);
        }
      });
      this.icon.set(icon);
      this.renderer.appendChild(this.host.nativeElement, icon);
    });

    effect(() => {
      const icon = this.icon();
      if (!icon) {
        return;
      }
      if (this.stretch()) {
        this.renderer.setAttribute(icon, 'width', '100%');
        this.renderer.setAttribute(icon, 'height', '100%');
      } else {
        const coerceWdth = coerceCssPixelValue(this.width());
        const coerceHeight = coerceCssPixelValue(this.height());

        this.renderer.setAttribute(icon, 'width', coerceWdth);
        this.renderer.setAttribute(icon, 'height', coerceHeight);
      }
    });
  }
}
