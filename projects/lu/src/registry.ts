import { pascalCase } from 'change-case';
import { glob } from 'glob';
import { iconsRepoPath } from '../../common/src/lib/constants';
import { Registry } from '../../common/src/lib/types';

export const LU_REGISTRY: Registry = {
  id: 'lu',
  source: {
    url: 'https://github.com/lucide-icons/lucide',
    branch: 'main',
    remoteDir: 'icons',
  },
  placeholder:"lu-placeholder",
  resolveFiles: async (icon) =>
    await glob(`${iconsRepoPath()}/${icon.source.remoteDir}/*.svg`),
  componentName: (fileName) => pascalCase(fileName.replace('.svg', '')),
  selector: (fileName) => fileName.replace('.svg', ''),
};
