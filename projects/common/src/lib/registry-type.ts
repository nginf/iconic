import { type Config } from 'svgo';

export interface RegistryContent {
  svgo?: boolean | Config;
  resolveType?: (
    fileName: string,
    fullPath: string,
    pureFileName: string
  ) => string;
  resolveFiles: (icon: Registry) => Promise<string[]>;
  componentName: (
    fileName: string,
    fullPath: string,
    pureFileName: string
  ) => string; // It should return pascalCase
  selector: (
    fileName: string,
    fullPath: string,
    pureFileName: string
  ) => string; // It should return kebab-case
}

export interface Registry {
  id: string;
  source: {
    url: string;
    branch: string;
    remoteDir: string;
  };

  contents: Array<RegistryContent>;
}
