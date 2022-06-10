const cp = require('child_process');
const path = require('path');

const [, , ...params] = process.argv;

const parsedParams = params.reduce((accu, i) => {
  const [k, v = true] = i.split('=');
  accu[k] = v;
  return accu;
}, {});

const { client = 'pnpm' } = parsedParams;

['cli', 'i18n', 'runtime-web', 'types', 'utils'].forEach(name => {
  const command = `${client} link ./packages/${name}`;
  console.log('run command: ', command);
  const process = cp.exec(command, { encoding: 'utf-8', cwd: path.resolve(__dirname, '../') }, err => {
    if (err) {
      console.error(err);
    }
  });
  process.stdout.on('data', console.log);
  process.stderr.on('data', console.error);
});
