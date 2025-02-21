import { mkdir, rm } from 'fs/promises';
import path from 'path';
import { iconsLibPath } from './constants';
import { IconBuilder } from './icon-builder';
import { IconInserter } from './icon-inserter';
import { Registry } from './registry-type';

export class Generator {
  constructor(private registry: Registry, private debugMode?: boolean) {}
  async init() {
    if (this.debugMode) {
      return;
    }
    try {
      await rm(iconsLibPath(), { recursive: true, force: true });

      await mkdir(iconsLibPath(), { recursive: true });

      console.log('Cleanup complete!');
    } catch (error) {
      console.error('Error while deleting folders:', error);
    }
  }

  async process() {
    const iconInseter = new IconInserter(this.registry, this.debugMode);

    await iconInseter.init();

    for (const registryContent of this.registry.contents) {
      const files = await registryContent.resolveFiles(this.registry);
      for (const file of files) {
        const fileName = path.basename(file);
        const iconBuilder = new IconBuilder(
          {
            name: fileName,
            fullPath: file,
            registry: this.registry,
            path: file,
            registryContent: registryContent,
          },
          this.debugMode
        );
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
    }

    await iconInseter.commit();
  }
}
