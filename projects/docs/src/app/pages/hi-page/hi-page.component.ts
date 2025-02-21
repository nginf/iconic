import { Component } from '@angular/core';
import { HI_TREE } from '../../../../../hi/src/tree';
import {
  IconPageComponent,
  IconType,
} from '../../core/browse-page/icon-page.component';
import { IconRegistry } from '../../models/icon-registry';

@Component({
  selector: 'app-hi-page',
  imports: [IconPageComponent],
  templateUrl: './hi-page.component.html',
  styleUrl: './hi-page.component.css',
})
export class HiPageComponent {
  tree = HI_TREE;
  registry: IconRegistry = {
    id: 'hi',
    name: 'Hero Icons',
    url: 'https://heroicons.com/',
    license: {
      name: 'MIT',
      url: 'https://github.com/tailwindlabs/heroicons/blob/master/LICENSE',
    },
  };
  types: IconType[] = [
    {
      name: 'Default (outline)',
      value: '',
    },
    {
      name: 'Solid',
      value: 'solid',
    },
  ];
}
