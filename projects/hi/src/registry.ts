import { kebabCase, pascalCase } from 'change-case';
import { glob } from 'glob';
import path from 'path';
import { iconsRepoPath } from '../../common/src/lib/constants';
import { Registry } from '../../common/src/lib/registry-type';

function getType(fullPath: string, prefix?: string) {
  const parentDir = path.dirname(fullPath);
  const parentBase = path.basename(parentDir);
  if (parentBase === 'outline') {
    return '';
  }
  return prefix ? `${prefix}${parentBase}` : parentBase;
}

function resolveIconName(
  _: string,
  fullPath: string,
  pureName: string,
  prefix?: string
) {
  const name = pureName + getType(fullPath, prefix);

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
      resolveType: (_, fullPath) => {
        return getType(fullPath);
      },
      resolveFiles: async (icon) =>
        await glob(`${iconsRepoPath()}/${icon.source.remoteDir}/outline/*.svg`),
      componentName: (fileName, fullPath, pureName) => {
        return pascalCase(resolveIconName(fileName, fullPath, pureName, '-'));
      },
      selector: (fileName, fullPath, pureName) => {
        return kebabCase(resolveIconName(fileName, fullPath, pureName, '-'));
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
      resolveType: (_, fullPath) => {
        return getType(fullPath);
      },
      resolveFiles: async (icon) =>
        await glob(`${iconsRepoPath()}/${icon.source.remoteDir}/solid/*.svg`),
      componentName: (fileName, fullPath, pureName) => {
        return pascalCase(resolveIconName(fileName, fullPath, pureName, '-'));
      },
      selector: (fileName, fullPath, pureName) => {
        return kebabCase(resolveIconName(fileName, fullPath, pureName, '-'));
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
