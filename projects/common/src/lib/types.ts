export interface Registry {
  id: string;
  source: {
    url: string;
    branch: string;
    remoteDir: string;
  };
  resolveFiles: (icon: Registry) => Promise<string[]>;
  componentName: (fileName: string, fullPath: string) => string; // It should return pascalCase
  selector: (fileName: string, fullPath: string) => string; // It should return kebab-case
}
