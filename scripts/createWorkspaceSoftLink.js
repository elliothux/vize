const path = require('path');
const fs = require('fs');

const workspacePath = path.resolve(__dirname, '../packages/cgi/workspace');

[
  [path.resolve(__dirname, '../packages/editor/build'), path.resolve(workspacePath, 'pages/editor')],
  [path.resolve(__dirname, '../packages/management-ui/build'), path.resolve(workspacePath, 'pages/management-ui')],
  [
    path.resolve(__dirname, '../packages/materials-universal'),
    path.resolve(workspacePath, 'materials/materials-universal'),
  ],
].forEach(([from, to]) => {
  console.log(`Create soft link from "${from}" to "${to}"`);
  if (fs.existsSync(to)) {
    fs.unlinkSync(to);
  }
  fs.symlinkSync(from, to);
});
