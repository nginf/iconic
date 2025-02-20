import { Component } from '@angular/core';
import { FA_TREE } from '../../../../../fa/src/tree';
import { BrowsePageComponent } from '../../core/browse-page/browse-page.component';
import { IconRegistry } from '../../models/icon-registry';

@Component({
  selector: 'app-fa-page',
  imports: [BrowsePageComponent],
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
      name: 'CC BY 4.0 License',
      url: 'https://creativecommons.org/licenses/by/4.0/',
    },
  };
}
