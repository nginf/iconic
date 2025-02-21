import { Component } from '@angular/core';
import { AD_TREE } from '../../../../../ad/src/tree';
import { IconPageComponent, IconType } from '../../core/browse-page/icon-page.component';
import { IconRegistry } from '../../models/icon-registry';

@Component({
  selector: 'app-ad-page',
  imports: [IconPageComponent],
  templateUrl: './ad-page.component.html',
  styleUrl: './ad-page.component.css',
})
export class AdPageComponent {
  tree = AD_TREE;
  registry: IconRegistry = {
    id: 'ad',
    name: 'Ant Design',
    url: 'https://github.com/ant-design/ant-design-icons/',
    license: {
      name: 'MIT',
      url: 'https://github.com/ant-design/ant-design-icons?tab=MIT-1-ov-file',
    },
  };

  types: IconType[] = [
    {
      name: 'Default (outlined)',
      value: '',
    },
    {
      name: 'Filled',
      value: 'filled',
    },
    {
      name: 'TwoTone',
      value: 'twotone',
    },
  ];
}
