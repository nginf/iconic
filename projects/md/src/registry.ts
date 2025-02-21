import { kebabCase, pascalCase } from 'change-case';
import { glob } from 'glob';
import path from 'path';
import { iconsRepoPath } from '../../common/src/lib/constants';
import { Registry } from '../../common/src/lib/types';

const TYPE_SUFFIX = {
  materialicons: '',
  materialiconsoutlined: 'Outlined',
  materialiconsround: 'Round',
  materialiconssharp: 'Sharp',
  materialiconstwotone: 'TwoTone',
};

function resolveIconName(_: string, fullPath: string) {
  const parts = fullPath.split(path.sep);
  const type = parts[parts.length - 2] as keyof typeof TYPE_SUFFIX;
  const iconName = parts[parts.length - 3];

  return iconName + TYPE_SUFFIX[type];
}

export const MD_REGISTRY: Registry = {
  id: 'md',
  source: {
    url: 'https://github.com/google/material-design-icons',
    branch: 'main',
    remoteDir: 'src',
  },
  contents: [
    {
      resolveFiles: async (icon) =>
        await glob(`${iconsRepoPath()}/${icon.source.remoteDir}/**/24px.svg`),
      componentName: (fileName, fullPath) => {
        return pascalCase(resolveIconName(fileName, fullPath));
      },
      selector: (fileName, fullPath) => {
        return kebabCase(resolveIconName(fileName, fullPath));
      },
    },
  ],
};
