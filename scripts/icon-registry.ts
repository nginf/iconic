import { pascalCase } from 'change-case';
import { glob } from 'glob';
import { ICONS_REPO_PATH } from './constants';

export interface IconRegistry {
  id: string;
  name: string;
  url: string;
  license: {
    name: string;
    url: string;
  };
  source: {
    url: string;
    branch: string;
    localName: string;
    remoteDir: string;
  };
  resolveFiles: (icon: IconRegistry) => Promise<string[]>;
  componentName: (fileName: string, fullPath: string) => string; // It should return pascalCase
  selector: (fileName: string, fullPath: string) => string; // It should return kebab-case
}

export const ICONS_REGISTRY: IconRegistry[] = [
  {
    id: 'lu',
    name: 'Lucide',
    url: 'https://lucide.dev/',
    license: {
      name: 'ISC',
      url: 'https://github.com/lucide-icons/lucide/blob/main/LICENSE',
    },
    source: {
      url: 'https://github.com/lucide-icons/lucide',
      branch: 'main',
      localName: 'lucide',
      remoteDir: 'icons',
    },
    resolveFiles: async (icon) =>
      await glob(
        `${ICONS_REPO_PATH}/${icon.source.localName}/${icon.source.remoteDir}/*.svg`
      ),
    componentName: (fileName) => pascalCase(fileName.replace('.svg', '')),
    selector: (fileName) => fileName.replace('.svg', ''),
  },
  // {
  //   id: 'md',
  //   name: 'Material Design icons',
  //   url: 'https://lucide.dev/',
  //   license: {
  //     name: 'ISC',
  //     url: 'https://github.com/lucide-icons/lucide/blob/main/LICENSE',
  //   },
  //   source: {
  //     url: 'https://github.com/google/material-design-icons.git',
  //     branch: 'master',
  //     localName: 'material',
  //     remoteDir: 'src/',
  //   },
  //   resolveFiles: async (icon) =>
  //     await glob(
  //       `${ICONS_REPO_PATH}/${icon.source.localName}/${icon.source.remoteDir}/**/*.svg`
  //     ),
  //   componentName: (fileName, fullPath) => {
  //     const parentDir = path.dirname(fullPath);
  //     const parentBase = path.basename(parentDir);

  //     function getType() {
  //       const trimmed = parentBase.replace('materialicons', '');
  //       if (!trimmed) {
  //         return '';
  //       }
  //       return '-' + trimmed;
  //     }

  //     const grandparentDir = path.dirname(parentDir);
  //     const grandParentBase = path.basename(grandparentDir);

  //     let compName = kebabCase(grandParentBase);
  //     compName += getType();

  //     return pascalCase(compName);
  //   },
  //   selector: (fileName, fullPath) => {
  //     const parentDir = path.dirname(fullPath);
  //     const parentBase = path.basename(parentDir);

  //     function getType() {
  //       const trimmed = parentBase.replace('materialicons', '');
  //       if (!trimmed) {
  //         return '';
  //       }
  //       return '-' + trimmed;
  //     }

  //     const grandparentDir = path.dirname(parentDir);
  //     const grandParentBase = path.basename(grandparentDir);

  //     let compName = kebabCase(grandParentBase);
  //     compName += getType();

  //     return compName;
  //   },
  // },
];
