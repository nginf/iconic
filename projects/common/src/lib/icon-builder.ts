import { capitalCase } from 'change-case';
import { readFileSync } from 'fs';
import { access, constants, mkdir, readFile } from 'fs/promises';
import path from 'path';
import { optimize } from 'svgo';
import { iconsLibPath } from './constants';
import { Registry } from './types';

const PLACEHOLDER_PATH = path.join(__dirname, './icon-placeholder.ts');

const iconPlaceholder = readFileSync(PLACEHOLDER_PATH, 'utf-8');

const COMPONENT_NAME_KEY = 'IconComponent';
const SELECTOR_KEY = 'app-icon';

const CONTENT_TOKEN = 'CONTENT';

export class IconBuilder {
  constructor(
    private icon: {
      name: string;
      path: string;
      registry: Registry;
      fullPath: string;
      svgo?: boolean;
    },
    private debugMode?: boolean
  ) {}

  async process() {
    this.createDirIfEmpty();
    let svgContent = await readFile(this.icon.path, 'utf-8');
    const componentName = this.resolveComponentName();
    const selector = this.resolveSelector();
    const placeholderContent = iconPlaceholder;

    svgContent = this.tryOptimize(svgContent);

    //Replaces template with SVG
    let iconContent = placeholderContent.replace(CONTENT_TOKEN, svgContent);

    iconContent = iconContent.replace(COMPONENT_NAME_KEY, componentName);
    iconContent = iconContent.replace(SELECTOR_KEY, selector);

    if (this.debugMode) {
      console.log('Selector ', selector);
      console.log('Component Name ', componentName);
    }

    const newFilePath = this.resolvenewFilePath();
    return {
      svgContent,
      newFilePath: newFilePath,
      content: iconContent,
      selector,
      compName: componentName,
    };
  }

  tryOptimize(svgContent: string) {
    if (this.icon.svgo) {
      return optimize(svgContent).data;
    }
    return svgContent;
  }

  private getOutputPath() {
    return `${iconsLibPath()}/`;
  }

  private async createDirIfEmpty() {
    try {
      await access(this.getOutputPath(), constants.F_OK);
    } catch {
      try {
        await mkdir(this.getOutputPath(), { recursive: true });
      } catch (err) {
        console.error('Error creating folder:', err);
      }
    }
  }

  private resolveComponentName() {
    const merged = `${this.icon.registry.componentName(
      this.icon.name,
      this.icon.fullPath,
      this.icon.name.replace('.svg', '')
    )}Icon`;
    return merged;
  }

  private resolveSelector() {
    const merged = `${this.icon.registry.selector(
      this.icon.name,
      this.icon.fullPath,
      this.icon.name.replace('.svg', '')
    )}-icon`;
    return merged;
  }

  private resolvenewFilePath() {
    return `${this.icon.name.replace('.svg', '')}`;
  }
}
