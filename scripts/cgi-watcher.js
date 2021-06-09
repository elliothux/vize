const watch = require('node-watch');
const path = require('path');
const fs = require('fs-extra');
const { debounce } = require('throttle-debounce');

console.log('Starting file watcher...\n\n\n');

[
  [
    path.resolve(__dirname, '../packages/cgi/dist'),
    path.resolve(__dirname, '../../vize-deploy-boilerplate/node_modules/@vize/cgi/dist'),
  ],
].forEach(([from, to]) => {
  const callback = (from, to) => {
    console.log(`Copy "${from}" --> "${to}"\n`);
    try {
      fs.copySync(from, to, { recursive: true, overwrite: true });
    } catch (e) {
      console.error({ from, to });
      console.error(e);
    }
  };
  watch(
    from,
    { recursive: true },
    debounce(1000, false, () => callback(from, to)),
  );
  callback(from, to);
});
