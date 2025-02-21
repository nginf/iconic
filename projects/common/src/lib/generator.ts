import path from 'path';
import { IconBuilder } from './icon-builder';
import { IconInserter } from './icon-inserter';
import { Registry } from './types';
import { readdir, rm } from 'fs/promises';
import { readFileSync } from 'fs';
import { placeholderPath } from './constants';
const PLACEHOLDER_PATH = path.join(__dirname, './icon-placeholder.ts');
const EXCLUDED_FOLDERS = new Set(['src', 'repo']); // Folders to keep

export class Generator {
  iconPlaceholder!: string;

  constructor(private registry: Registry, private debugMode?: boolean) {}
  async init() {
    if (this.debugMode) {
      return;
    }
    try {
      this.iconPlaceholder = readFileSync(placeholderPath(this.registry.placeholder), 'utf-8');
      const entries = await readdir(__dirname, { withFileTypes: true });

      // Filter only directories except the excluded folders
      const foldersToDelete = entries
        .filter(
          (dirent) => dirent.isDirectory() && !EXCLUDED_FOLDERS.has(dirent.name)
        )
        .map((dirent) => path.join(__dirname, dirent.name));

      // Delete all selected folders
      await Promise.all(
        foldersToDelete.map((folder) =>
          rm(folder, { recursive: true, force: true })
        )
      );

      console.log('Cleanup complete!');
    } catch (error) {
      console.error('Error while deleting folders:', error);
    }
  }

  async process() {
    const iconInseter = new IconInserter(this.registry, this.debugMode);

    await iconInseter.init();

    const files = await this.registry.resolveFiles(this.registry);
    for (const file of files) {
      const fileName = path.basename(file);
      const iconBuilder = new IconBuilder(
        {
          name: fileName,
          fullPath: file,
          registry: this.registry,
          path: file,
          svgo: this.registry.svgo,
          iconPlaceholder: this.iconPlaceholder,
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
    await iconInseter.commit();
  }
}
