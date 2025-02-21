import { writeFile } from 'fs/promises';
import path from 'path';
import { iconsLibPath, publicApiPath, treePath } from './constants';
import { Registry } from './registry-type';

export class IconInserter {
  private _publicApiContent = '';
  private iconTree: Array<{ name: string; content: string; compName: string }> =
    [];
  constructor(private registry: Registry, public debugMode?: boolean) {}

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
    const iconPath = path.join(iconsLibPath(), `${newFilePath}.ts`);

    await writeFile(iconPath, content, 'utf8');

    this._publicApiContent += `export * from './icons/${newFilePath}';\n`;

    // await writeFile(publicApiPath, `export * from './${newFilePath}';`, 'utf8');

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
      await writeFile(publicApiPath(), this._publicApiContent, 'utf8');
      await writeFile(treePath(), tsContent, 'utf8');
    }
  }
}
