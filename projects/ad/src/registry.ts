import { kebabCase, pascalCase } from 'change-case';
import { glob } from 'glob';
import path from 'path';
import { iconsRepoPath } from '../../common/src/lib/constants';
import { Registry } from '../../common/src/lib/registry-type';

const DEFAULT_TYPE = 'outlined';

function getType(fullPath: string, prefix?: string) {
  const parentDir = path.dirname(fullPath);
  const parentBase = path.basename(parentDir);
  if (parentBase === DEFAULT_TYPE) {
    return '';
  }
  return prefix ? `${prefix}${parentBase}` : parentBase;
}

export const AD_REGISTRY: Registry = {
  id: 'ad',
  treeSortOrder: [undefined, 'filled', 'twotone'],
  source: {
    url: 'https://github.com/ant-design/ant-design-icons.git',
    branch: 'master',
    remoteDir: 'packages/icons-svg/svg/',
  },
  contents: [
    {
      svgo: true,
      resolveType: (_, fullPath, pureFileName) => {
        return getType(fullPath);
      },
      resolveFiles: async (icon) =>
        await glob(`${iconsRepoPath()}/${icon.source.remoteDir}/**/*.svg`),
      componentName: (_, fullPath, pureFileName) => {
        let compName = kebabCase(pureFileName);
        compName += getType(fullPath, '-');
        return pascalCase(compName);
      },
      selector: (_, fullPath, pureFileName) => {
        const merged = pureFileName + getType(fullPath, '-');
        return merged;
      },
    },
  ],
};
