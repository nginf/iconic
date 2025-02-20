import { rm, mkdir } from 'fs/promises';
import path from 'path';
import simpleGit from 'simple-git';
import { iconsRepoPath } from './constants';
import { Registry } from './types';

export class Fetcher {
  constructor(private registry: Registry) {}
  async init() {
    // Remove existing repo dir to start fresh
    await rm(iconsRepoPath(), {
      recursive: true,
      force: true,
    });

    // Create repo dir again
    await mkdir(iconsRepoPath(), {
      recursive: true,
    });
  }

  async process() {
    const repoUrl = this.registry.source.url;
    const branch = this.registry.source.branch;
    const remoteDir = this.registry.source.remoteDir;

    const repoName = path.basename(repoUrl, '.git');
    const repoPath = path.join(iconsRepoPath());
    const git = simpleGit();
    console.log('Start fetching ', this.registry.id);
    try {
      // Clone the repository without checking out files
      await git.clone(repoUrl, repoPath, ['--no-checkout', '--filter=tree:0']);
      const repoGit = simpleGit(repoPath);

      console.log('Cloning finished', this.registry.id);

      // Initialize sparse checkout in cone mode
      await repoGit.raw([
        'sparse-checkout',
        'set',
        '--cone',
        '--skip-checks',
        remoteDir,
      ]);

      console.log('Checking out sparsely', this.registry.id);

      // Checkout the specified branch
      await repoGit.checkout(branch);

      // Delete the .git folder
      const gitFolderPath = path.join(repoPath, '.git');
      await rm(gitFolderPath, { recursive: true, force: true });
      console.log(`.git folder deleted successfully for ${repoName}`);

      console.log(`Process finished for ${this.registry.id}.`);
    } catch (err) {
      console.error(`Error during sparse checkout for ${repoName}:`, err);
    }
  }
}
