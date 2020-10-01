const path = require('path');
const fs = require('fs');

const typesPath = path.relative(__dirname, './packages/editor/src/types');
fs.symlink(typesPath, path.relative(__dirname, './packages/cgi/types'), console.log);
// console.log(typesPath);
