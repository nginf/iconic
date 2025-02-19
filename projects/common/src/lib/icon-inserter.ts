import { writeFile } from 'fs/promises';
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
    const fileDist = `${path.join(this.registryDir(), newFilePath)}.ts`;
    await writeFile(fileDist, content, 'utf8');

    this._indexContent += `export * from './lib/${newFilePath}';\n`;
    this.iconTree.push({
      name: selector,
      content: svgContent,
      compName: compName,
    });
  }

  async commit() {
    //Index Update
    const indexPath = `${publicApiPath()}`;
    if (!this.debugMode) {
      await writeFile(indexPath, this._indexContent, 'utf8');
    }
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
