import { kebabCase, pascalCase } from 'change-case';
import { glob } from 'glob';
import path from 'path';
import { iconsRepoPath } from '../../common/src/lib/constants';
import { Registry } from '../../common/src/lib/registry-type';

function getType(fullPath: string, prefix?: string) {
  const parentDir = path.dirname(fullPath);
  const parentBase = path.basename(parentDir);
  if (parentBase === 'solid') {
    return '';
  }
  return prefix ? `${prefix}${parentBase}` : parentBase;
}

function resolveIconName(
  _: string,
  fullPath: string,
  pureFileName: String,
  prefix?: string
) {
  const iconName = pureFileName;
  return iconName + getType(fullPath, prefix);
}

export const FA_REGISTRY: Registry = {
  id: 'fa',
  source: {
    url: 'https://github.com/FortAwesome/Font-Awesome.git',
    branch: '6.x',
    remoteDir: 'svgs/',
  },
  treeSortOrder: [undefined, 'regular', 'brands'],
  contents: [
    {
      resolveType: (_, fullPath) => {
        return getType(fullPath);
      },
      resolveFiles: async (icon) =>
        await glob(`${iconsRepoPath()}/${icon.source.remoteDir}/**/*.svg`),
      componentName: (fileName, fullPath, pureFileName) => {
        return pascalCase(
          resolveIconName(fileName, fullPath, pureFileName, '-')
        );
      },
      selector: (fileName, fullPath, pureFileName) => {
        return kebabCase(
          resolveIconName(fileName, fullPath, pureFileName, '-')
        );
      },
    },
  ],
};
