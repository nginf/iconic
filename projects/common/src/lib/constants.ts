import path from 'path';

export const iconsRepoPath = function () {
  return path.join(process.cwd(), './repo');
};

export const iconsLibPath = function () {
  return path.join(process.cwd(), './src/icons');
};

export const publicApiPath = function () {
  return path.join(process.cwd(), './src', './public-api.ts');
};

export const treePath = function () {
  return path.join(process.cwd(), `./src/tree.ts`);
};

export const placeholderPath = function (placeholder?: string) {
  return path.join(
    __dirname,    placeholder ? `./${placeholder}.ts` : './common-placeholder.ts'
  );
};
