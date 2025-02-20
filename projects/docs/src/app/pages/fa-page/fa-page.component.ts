import { Component } from '@angular/core';
import { FA_TREE } from '../../../../../fa/src/tree';
import { IconPageComponent } from '../../core/browse-page/icon-page.component';
import { IconRegistry } from '../../models/icon-registry';

@Component({
  selector: 'app-fa-page',
  imports: [IconPageComponent],
  templateUrl: './fa-page.component.html',
  styleUrl: './fa-page.component.css',
})
export class FaPageComponent {
  tree = FA_TREE;
  registry: IconRegistry = {
    id: 'fa',
    name: 'Font Awesome',
    url: 'https://fontawesome.com/',
    license: {
      name: 'CC BY 4.0',
      url: 'https://creativecommons.org/licenses/by/4.0/',
    },
  };
}
