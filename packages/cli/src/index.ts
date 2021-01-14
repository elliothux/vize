import chalk from 'chalk';
import { Command } from 'commander';
import { cleanArgs } from './utils';
import { createLib, dev, dist } from './commands';
import { createComponent } from './commands/create/component';

// eslint-disable-next-line
const packageJson = require('../package.json');

const program = new Command()
  .version(packageJson.version)
  .usage(`${chalk.green('<command>')} [options]`)
  .allowUnknownOption();

program
  .command('dev [entry]')
  .description('开启调试服务')
  .option('-o, --open', '自动打开编辑器')
  .option('-p, --port <port>', 'dev server 端口')
  .action((i, cmd) => {
    const options = cleanArgs(cmd);
    dev(options);
  });

program
  .command('dist [entry]')
  .description('构建物料库')
  .action(dist);

program
  .command('create-lib <name>')
  .description('创建物料库')
  .option('-r, --registry <registry>', 'NPM 软件源地址')
  .action((name, cmd) => {
    const options = cleanArgs(cmd);
    createLib(name, options);
  });

program
  .command('create-component <name>')
  .description('创建组件')
  .option('-r, --registry <registry>', 'NPM 软件源地址')
  .action((name, cmd) => {
    const options = cleanArgs(cmd);
    createComponent(name, options);
  });

program.arguments('<command>').action((cmd: string) => {
  program.outputHelp();
  console.log(`\n${chalk.red(`Unknown command ${chalk.yellow(cmd)}.`)}\n`);
});

program.on('--help', () => {
  console.log(`\n运行 ${chalk.cyan('vize <command> --help')} 查看相关命令的详细信息\n`);
});

program.commands.forEach((c: any) => c.on('--help', () => console.log()));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
