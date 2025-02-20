import { Component } from '@angular/core';
import { LU_TREE } from '../../../../../lu/src/tree';
import { IconPageComponent } from '../../core/browse-page/icon-page.component';
import { IconRegistry } from '../../models/icon-registry';

@Component({
  selector: 'app-lu-page',
  imports: [IconPageComponent],
  templateUrl: './lu-page.component.html',
  styleUrl: './lu-page.component.css',
})
export class LuPageComponent {
  tree = LU_TREE;
  registry: IconRegistry = {
    id: 'lu',
    name: 'Lucide',
    url: 'https://lucide.dev/',
    license: {
      name: 'ISC',
      url: 'https://github.com/lucide-icons/lucide/blob/main/LICENSE',
    },
  };
}
