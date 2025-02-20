import { kebabCase, pascalCase } from 'change-case';
import { glob } from 'glob';
import path from 'path';
import { iconsRepoPath } from '../../common/src/lib/constants';
import { Registry } from '../../common/src/lib/types';

export const AD_REGISTRY: Registry = {
  id: 'ad',
  source: {
    url: 'https://github.com/ant-design/ant-design-icons.git',
    branch: 'master',
    remoteDir: 'packages/icons-svg/svg/',
  },
  svgo: true,
  resolveFiles: async (icon) =>
    await glob(`${iconsRepoPath()}/${icon.source.remoteDir}/**/*.svg`),
  componentName: (_, fullPath, pureFileName) => {
    const parentDir = path.dirname(fullPath);
    const parentBase = path.basename(parentDir);

    function getType() {
      return parentBase;
    }

    let compName = kebabCase(pureFileName);
    compName += '-' + getType();

    return pascalCase(compName);
  },
  selector: (_, fullPath, pureFileName) => {
    const parentDir = path.dirname(fullPath);
    const parentBase = path.basename(parentDir);

    function getType() {
      return parentBase;
    }

    const merged = pureFileName + '-' + getType();

    return merged;
  },
};
