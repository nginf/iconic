import { mkdir, writeFile, rm } from 'fs/promises';
import path from 'path';
import { iconsLibPath, publicApiPath, treePath } from './constants';
import { Registry } from './types';

export class IconInserter {
  private _indexContent = '';
  private iconTree: Array<{ name: string; content: string; compName: string }> =
    [];
  constructor(private registry: Registry, public debugMode?: boolean) {}

  private registryDir() {
    return `${iconsLibPath()}`;
  }

  async init() {}
  async add({
    svgContent,
    newFilePath,
    content,
    selector,
    compName,
  }: {
    svgContent: string;
    newFilePath: string;
    content: string;
    selector: string;
    compName: string;
  }) {
    const iconDir = path.join(this.registryDir(), newFilePath);

    await rm(iconDir, { recursive: true, force: true });

    await mkdir(iconDir, { recursive: true });

    const srcDir = path.join(iconDir, './src');

    await mkdir(srcDir, { recursive: true });

    const ngPackagePath = path.join(iconDir, './ng-package.json');

    await writeFile(ngPackagePath, '{}', 'utf-8');

    const filePath = path.join(srcDir, `${newFilePath}.ts`);

    await writeFile(filePath, content, 'utf8');

    const publicApiPath = path.join(srcDir, './public_api.ts');

    await writeFile(publicApiPath, `export * from './${newFilePath}';`, 'utf8');

    this.iconTree.push({
      name: selector,
      content: svgContent,
      compName: compName,
    });
  }

  async commit() {
    const tsContent = `export const ${this.registry.id.toUpperCase()}_TREE = ${JSON.stringify(
      this.iconTree,
      null,
      2
    )};`;
    if (this.debugMode) {
      return;
    } else {
      await writeFile(treePath(), tsContent, 'utf8');
    }
  }
}
