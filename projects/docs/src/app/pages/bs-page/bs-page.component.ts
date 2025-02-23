import { Component } from '@angular/core';
import { BS_TREE } from "../../../../../bs/src/tree";
import { IconRegistry } from '../../models/icon-registry';
import { IconPageComponent, IconType } from '../../core/browse-page/icon-page.component';

@Component({
  selector: 'app-bs-page',
  imports: [IconPageComponent],
  templateUrl: './bs-page.component.html',
  styleUrl: './bs-page.component.css',
})
export class BsPageComponent {
  tree = BS_TREE;
  registry: IconRegistry = {
    id: 'bs',
    name: 'Bootstrap Icons',
    url: 'https://icons.getbootstrap.com/',
    license: {
      name: 'MIT',
      url: 'https://github.com/twbs/icons/blob/main/LICENSE',
    },
  };

  types: IconType[] = [
    {
      name: 'Default (outline)',
      value: '',
    },
    {
      name: 'Fill',
      value: 'fill',
    },
  ];
}
