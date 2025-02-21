import {
  animate,
  animation,
  AUTO_STYLE,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
import { IconRegistry } from '../../models/icon-registry';
import { IconModel } from '../../models/icon.model';
import { ChevronDownComponent } from '../icons/chevron-down.component';
import { OptionComponent } from '../select/option.component';
import { SelectComponent } from '../select/select.component';
import { SourceCodeComponent } from '../source-code/source-code.component';
import { IconCardComponent } from './icon-card/icon-card.component';
import { IconDetailComponent } from './icon-detail/icon-detail.component';

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

  filteredItems = computed(() => {
    const type = this.type();

    const typeFiltered = this.tree().filter((item) => item.type == type?.value);

    const search = this.search();
    if (!search) {
      return typeFiltered;
    }
    return typeFiltered.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  constructor() {
    effect(() => {
      const types = this.types();
      if (types) {
        this.type.set(types[0]);
      }
    });
  }

  compareWith(v1: any, v2: any) {
    return v1?.value == v2;
  }
}
