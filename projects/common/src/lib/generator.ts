import { mkdir, rm } from 'fs/promises';
import path from 'path';
import { iconsLibPath } from './constants';
import { IconBuilder } from './icon-builder';
import { IconInserter } from './icon-inserter';
import { Registry } from './types';

export class Generator {
  constructor(private registry: Registry) {}
  async init() {
    await rm(iconsLibPath(), {
      recursive: true,
      force: true,
    });
    await mkdir(iconsLibPath(), {
      recursive: true,
    });
  }

  async process() {
    const iconInseter = new IconInserter(this.registry);
    await iconInseter.init();
    const files = await this.registry.resolveFiles(this.registry);
    for (const file of files) {
      const fileName = path.basename(file);
      const iconBuilder = new IconBuilder({
        name: fileName,
        fullPath: file,
        registry: this.registry,
        path: file,
      });
      const { svgContent, newFilePath, content, selector, compName } =
        await iconBuilder.process();
      await iconInseter.add({
        svgContent,
        newFilePath,
        content,
        selector,
        compName,
      });
    }
    await iconInseter.commit();
  }
}
