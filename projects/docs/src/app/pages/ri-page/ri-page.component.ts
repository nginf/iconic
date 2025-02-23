import { Component } from '@angular/core';
import { RI_TREE } from '../../../../../ri/src/tree';
import { IconRegistry } from '../../models/icon-registry';
import {
  IconPageComponent,
  IconType,
} from '../../core/browse-page/icon-page.component';
@Component({
  selector: 'app-ri-page',
  imports: [IconPageComponent],
  templateUrl: './ri-page.component.html',
  styleUrl: './ri-page.component.css',
})
export class RiPageComponent {
  tree = RI_TREE;
  registry: IconRegistry = {
    id: 'ri',
    name: 'Remix Icons',
    url: 'https://remixicon.com/',
    license: {
      name: 'Apache 2.0',
      url: 'https://github.com/Remix-Design/RemixIcon/blob/master/License',
    },
  };

  types: IconType[] = [
    {
      name: 'Default (line)',
      value: '',
    },
    {
      name: 'Fill',
      value: 'fill',
    },
  ];
}
