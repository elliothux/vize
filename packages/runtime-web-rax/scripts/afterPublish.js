/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');

const types = path.resolve(__dirname, '../types');
const _types = path.resolve(__dirname, '../_types');

fs.rmdirSync(types, { recursive: true });
fs.unlinkSync(_types);

require('../../../scripts/createPackageSoftLink.js');
