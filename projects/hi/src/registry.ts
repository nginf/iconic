import { kebabCase, pascalCase } from 'change-case';
import { glob } from 'glob';
import path from 'path';
import { iconsRepoPath } from '../../common/src/lib/constants';
import { Registry } from '../../common/src/lib/registry-type';

function resolveIconName(_: string, fullPath: string, pureName: string) {
  const parentDir = path.dirname(fullPath);
  const type = path.basename(parentDir);
  const name = pureName + '-' + type;
  if (name.includes('svg')) {
    console.log('PURE ', pureName, ' Type: ', type);
  }
  return name;
}

export const HI_REGISTRY: Registry = {
  id: 'hi',
  source: {
    url: 'https://github.com/tailwindlabs/heroicons',
    branch: 'master',
    remoteDir: 'src/24',
  },
  contents: [
    {
      resolveFiles: async (icon) =>
        await glob(`${iconsRepoPath()}/${icon.source.remoteDir}/outline/*.svg`),
      componentName: (fileName, fullPath, pureName) => {
        return pascalCase(resolveIconName(fileName, fullPath, pureName));
      },
      selector: (fileName, fullPath, pureName) => {
        return kebabCase(resolveIconName(fileName, fullPath, pureName));
      },
      svgo: {
        plugins: [
          'preset-default',
          'removeDimensions',
          'sortAttrs',
          'cleanupListOfValues',
          {
            name: 'removeAttrs',
            params: {
              attrs: ['stroke', 'path:stroke-width'],
            },
          },
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [
                {
                  'stroke-width': '1.5',
                  stroke: 'currentColor',
                },
              ],
            },
          },
        ],
      },
    },
    {
      resolveFiles: async (icon) =>
        await glob(`${iconsRepoPath()}/${icon.source.remoteDir}/solid/*.svg`),
      componentName: (fileName, fullPath, pureName) => {
        return pascalCase(resolveIconName(fileName, fullPath, pureName));
      },
      selector: (fileName, fullPath, pureName) => {
        return kebabCase(resolveIconName(fileName, fullPath, pureName));
      },
      svgo: {
        plugins: [
          'preset-default',
          'removeDimensions',
          'sortAttrs',
          'cleanupListOfValues',
          {
            name: 'removeAttrs',
            params: {
              attrs: ['fill'],
            },
          },
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [
                {
                  fill: 'currentColor',
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
