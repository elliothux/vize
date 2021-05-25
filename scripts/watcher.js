const watch = require('node-watch');
const path = require('path');
const fs = require('fs-extra');

console.log('Starting file watcher...\n\n\n');

const writingStatusMap = {};

[
  [path.resolve(__dirname, '../packages/i18n'), path.resolve(__dirname, '../packages/editor/src/i18n')],
  // [path.resolve(__dirname, '../packages/types/src'), path.resolve(__dirname, '../packages/editor/src/types')],
  [path.resolve(__dirname, '../packages/runtime-web/src'), path.resolve(__dirname, '../packages/editor/src/runtime')],
  [
    path.resolve(__dirname, '../packages/management-ui/src/types/record'),
    path.resolve(__dirname, '../packages/editor/src/sharedTypes/record'),
  ],
  [
    path.resolve(__dirname, '../packages/management-ui/src/api/utils.ts'),
    path.resolve(__dirname, '../packages/editor/src/api/utils.ts'),
  ],
].forEach(([from, to]) => {
  const callback = (from, to) => {
    if (writingStatusMap[from] || writingStatusMap[to]) {
      return;
    }

    writingStatusMap[to] = true;
    console.log(`Copy "${from}" --> "${to}"\n`);
    try {
      fs.copySync(from, to, { recursive: true, overwrite: true });
    } catch (e) {
      console.error({ from, to });
      console.error(e);
    }
    setTimeout(() => (writingStatusMap[to] = false), 2000);
  };
  watch(from, { recursive: true }, () => callback(from, to));
  watch(to, { recursive: true }, () => callback(to, from));
  callback(from, to);
});
