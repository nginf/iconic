import { kebabCase, pascalCase } from 'change-case';
import { glob } from 'glob';
import path from 'path';
import { iconsRepoPath } from '../../common/src/lib/constants';
import { Registry } from '../../common/src/lib/types';

const TYPE_SUFFIX = {
  brands: 'brands',
  regular: '',
  solid: 'solid',
};

function resolveIconName(_: string, fullPath: string, pureFileName: String) {
  const iconName = pureFileName;
  const parentDir = path.basename(path.dirname(fullPath));
  const type = parentDir as keyof typeof TYPE_SUFFIX;
  return iconName + '-' + TYPE_SUFFIX[type];
}

export const FA_REGISTRY: Registry = {
  id: 'fa',
  source: {
    url: 'https://github.com/FortAwesome/Font-Awesome.git',
    branch: '6.x',
    remoteDir: 'svgs/',
  },
  resolveFiles: async (icon) =>
    await glob(`${iconsRepoPath()}/${icon.source.remoteDir}/**/*.svg`),
  componentName: (fileName, fullPath, pureFileName) => {
    return pascalCase(resolveIconName(fileName, fullPath, pureFileName));
  },
  selector: (fileName, fullPath, pureFileName) => {
    return kebabCase(resolveIconName(fileName, fullPath, pureFileName));
  },
};
