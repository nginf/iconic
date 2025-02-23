import { pascalCase } from 'change-case';
import { glob } from 'glob';
import { iconsRepoPath } from '../../common/src/lib/constants';
import { Registry } from '../../common/src/lib/registry-type';

export const LU_REGISTRY: Registry = {
  id: 'ri',
  source: {
    url: 'https://github.com/Remix-Design/RemixIcon.git',
    branch: 'master',
    remoteDir: 'icons',
  },
  contents: [
    {
      resolveFiles: async (icon) =>
        await glob(`${iconsRepoPath()}/${icon.source.remoteDir}/**/*.svg`),
      componentName: (fileName) =>
        pascalCase(fileName.replace('-line.svg', '').replace('.svg', '')),
      selector: (fileName) => fileName.replace('-line.svg', '').replace('.svg', ''),
      resolveType(fileName) {
        if (fileName.includes('-fill')) {
          return 'fill';
        }
        return '';
      },
    },
  ],
};
