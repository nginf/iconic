import { Component } from '@angular/core';
import { LU_TREE } from '../../../../../../lu/src/tree';
import { IconPageComponent } from '../../../core/browse-page/icon-page.component';
import { IconRegistry } from '../../../models/icon-registry';

@Component({
  selector: 'app-lucide-browse',
  imports: [IconPageComponent],
  templateUrl: './lucide-browse.component.html',
  styleUrl: './lucide-browse.component.css',
})
export class LucideBrowseComponent {
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
