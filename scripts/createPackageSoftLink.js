const path = require('path');
const fs = require('fs');

[
  [path.resolve(__dirname, '../packages/i18n'), path.resolve(__dirname, '../packages/editor/src/i18n')],
  [path.resolve(__dirname, '../packages/types/src'), path.resolve(__dirname, '../packages/editor/src/types')],
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
  console.log(`Create soft link from "${from}" to "${to}"`);
  if (fs.existsSync(to)) {
    fs.unlinkSync(to);
  }
  fs.symlinkSync(from, to);
});
