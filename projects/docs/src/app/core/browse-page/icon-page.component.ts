import {
  animate,
  animation,
  AUTO_STYLE,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { IconRegistry } from '../../models/icon-registry';
import { IconModel } from '../../models/icon.model';
import { OptionComponent } from '../select/option.component';
import { SelectComponent } from '../select/select.component';
import { SourceCodeComponent } from '../source-code/source-code.component';
import { IconCardComponent } from './icon-card/icon-card.component';
import { IconDetailComponent } from './icon-detail/icon-detail.component';
import { ChevronDownComponent } from '../icon/chevron-down.component';
import Fuse from 'fuse.js';

export const EXPAND_ON_ENTER_ANIMATION = trigger('expandOnEnter', [
  transition(':enter', [
    animation(
      animate(
        '150ms',
        keyframes([
          style({
            height: '0',
            visibility: 'hidden',
            overflow: 'hidden',
            easing: 'ease-out',
            offset: 0,
          }),
          style({
            height: AUTO_STYLE,
            visibility: AUTO_STYLE,
            overflow: 'hidden',
            easing: 'ease-out',
            offset: 1,
          }),
        ])
      )
    ),
  ]),
]);
export const COLLAPSE_ON_LEAVE = trigger('collapseOnLeave', [
  transition(':leave', [
    animation(
      animate(
        '150ms',
        keyframes([
          style({
            height: AUTO_STYLE,
            visibility: AUTO_STYLE,
            overflow: 'hidden',
            easing: 'ease-in',
            offset: 0,
          }),
          style({
            height: '0',
            visibility: 'hidden',
            overflow: 'hidden',
            easing: 'ease-in',
            offset: 1,
          }),
        ])
      )
    ),
  ]),
]);

export interface IconType {
  value: string | undefined;
  name: string;
}

@Component({
  selector: 'app-icon-page',
  imports: [
    IconCardComponent,
    IconDetailComponent,
    FormsModule,
    SourceCodeComponent,
    ChevronDownComponent,
    SelectComponent,
    OptionComponent,
  ],
  templateUrl: './icon-page.component.html',
  styleUrl: './icon-page.component.css',
  animations: [EXPAND_ON_ENTER_ANIMATION, COLLAPSE_ON_LEAVE],
})
export class IconPageComponent {
  title = inject(Title);
  meta = inject(Meta);
  document = inject(DOCUMENT);

  registry = input.required<IconRegistry>();

  openedIcon = signal<IconModel | undefined>(undefined);

  types = input<IconType[]>();

  type = model<IconType>();

  http = inject(HttpClient);

  apiIsOpened = signal(false);

  search = model<string>();

  tree = input.required<IconModel[]>();

  installCode = computed(
    () => `npm install @nginf/iconic-${this.registry().id}`
  );

  fuse: Fuse<IconModel> | undefined;

  filteredItems = computed(() => {
    const type = this.type();

    const typeFiltered = this.tree().filter((item) => item.type == type?.value);

    const search = this.search();
    if (!search || !this.fuse) {
      return typeFiltered;
    }
    return this.fuse.search(search).map((r) => r.item);
  });

  constructor() {
    effect(() => {
      const types = this.types();
      if (types) {
        this.type.set(types[0]);
      }
    });

    effect(() => {
      const tree = this.tree();
      this.fuse = new Fuse(tree, {
        includeScore: true,
        threshold: 0.3,
        keys: ['name','compName'], // Not needed for an array of strings
      });
    });

    effect(() => {
      const label = this.registry().name;
      const subTitle = `Angular icon library for ${label}`;
      this.title.setTitle(`${label} | @nginf/iconic`);
      if (subTitle) {
        this.meta.updateTag({ name: 'description', content: subTitle });
      }
      this.meta.addTags([
        { property: 'og:title', content: label },
        {
          property: 'og:description',
          content: subTitle ?? label,
        },
        {
          property: 'og:image',
          content: 'https://nginf.github.io/iconic/logo.png',
        },
        { property: 'og:image:alt', content: '@nginf/iconic logo' },
        { property: 'og:url', content: this.document.location.href },
        { property: 'og:type', content: 'website' },
      ]);
    });
  }

  compareWith(v1: any, v2: any) {
    return v1?.value == v2;
  }
}
