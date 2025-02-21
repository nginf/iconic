import { Component } from '@angular/core';
import { MD_TREE } from '../../../../../md/src/tree';
import {
  IconPageComponent,
  IconType,
} from '../../core/browse-page/icon-page.component';
import { IconRegistry } from '../../models/icon-registry';

@Component({
  selector: 'app-md-page',
  imports: [IconPageComponent],
  templateUrl: './md-page.component.html',
  styleUrl: './md-page.component.css',
})
export class MdPageComponent {
  tree = MD_TREE;
  registry: IconRegistry = {
    id: 'md',
    name: 'Material Design',
    url: 'https://fonts.google.com/icons',
    license: {
      name: 'APACHE',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  };

  types: IconType[] = [
    {
      name: 'Default (filled)',
      value: '',
    },
    {
      name: 'Outlined',
      value: 'outlined',
    },
    {
      name: 'Round',
      value: 'round',
    },
    {
      name: 'Sharp',
      value: 'sharp',
    },
    {
      name: 'TwoTone',
      value: 'twotone',
    },
  ];
}
