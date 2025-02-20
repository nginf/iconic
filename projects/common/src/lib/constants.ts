import path from 'path';

export const iconsRepoPath = function () {
  return path.join(process.cwd(), './repo');
};

export const iconsLibPath = function () {
  return path.join(process.cwd(), './src/lib');
};

export const publicApiPath = function () {
  return path.join(process.cwd(), './src', './public-api.ts');
};

export const treePath = function () {
  return path.join(process.cwd(), `./src/tree.ts`);
};
