const path = require('path');
const fs = require('fs');

[
  [path.resolve(__dirname, '../packages/editor/src/types'), path.resolve(__dirname, '../packages/cgi/types')],
  [path.resolve(__dirname, '../packages/editor/src/types'), path.resolve(__dirname, '../packages/generator-web/types')],
  [path.resolve(__dirname, '../packages/editor/src/types'), path.resolve(__dirname, '../packages/runtime-web/types')],
  [path.resolve(__dirname, '../packages/runtime-web/src'), path.resolve(__dirname, '../packages/editor/src/runtime')],
  [path.resolve(__dirname, '../packages/runtime-web/src'), path.resolve(__dirname, '../packages/generator-web/src/runtime')],
].forEach(([from, to]) => {
  console.log(`Create soft link from "${from}" to "${to}"`);
  if (fs.existsSync(to)) {
    fs.unlinkSync(to);
  }
  fs.symlinkSync(from, to);
});
