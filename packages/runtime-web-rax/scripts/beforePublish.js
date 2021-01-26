/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

function main() {
  const types = path.resolve(__dirname, '../types');
  const _types = path.resolve(__dirname, '../_types');
  fs.renameSync(types, _types);
  fs.mkdirSync(types);
  fs.readdirSync(_types).map(file => {
    const from = path.resolve(_types, file);
    const to = path.resolve(types, file);
    fs.copyFileSync(from, to);
  });
}

main();
