import { pascalCase } from 'change-case';
import { glob } from 'glob';
import { iconsRepoPath } from '../../common/src/lib/constants';
import { Registry } from '../../common/src/lib/registry-type';

export const LU_REGISTRY: Registry = {
  id: 'bs',
  source: {
    url: 'https://github.com/twbs/icons.git',
    branch: 'main',
    remoteDir: 'icons',
  },
  contents: [
    {
      resolveFiles: async (icon) =>
        await glob(`${iconsRepoPath()}/${icon.source.remoteDir}/*.svg`),
      componentName: (fileName) => pascalCase(fileName.replace('.svg', '')),
      selector: (fileName) => fileName.replace('.svg', ''),
    },
  ],
};
