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
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconRegistry } from '../../models/icon-registry';
import { IconModel } from '../../models/icon.model';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ChevronDownComponent } from '../icons/chevron-down.component';
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

@Component({
  selector: 'app-browse-page',
  imports: [
    IconCardComponent,
    IconDetailComponent,
    FormsModule,
    SourceCodeComponent,
    ChevronDownComponent,
    IconButtonComponent,
  ],
  templateUrl: './browse-page.component.html',
  styleUrl: './browse-page.component.css',
  animations: [EXPAND_ON_ENTER_ANIMATION, COLLAPSE_ON_LEAVE],
})
export class BrowsePageComponent {
  registry = input.required<IconRegistry>();

  openedIcon = signal<IconModel | undefined>(undefined);

  http = inject(HttpClient);

  apiIsOpened = signal(false);

  search = model<string>();

  tree = input.required<IconModel[]>();

  installCode = computed(
    () => `npm install @nginf/iconic-${this.registry().id}`
  );

  filteredItems = computed(() => {
    const search = this.search();
    if (!search) {
      return this.tree();
    }
    return this.tree().filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });
}
