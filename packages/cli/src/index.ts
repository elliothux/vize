import chalk from 'chalk';
import { Command } from 'commander';
import updateNotifier from 'update-notifier';
import { cleanArgs } from './utils';
import {
  createLib,
  dev,
  dist,
  createComponent,
  createPlugin,
  createAction,
  createContainer,
  createFormField,
  release,
} from './commands';

// eslint-disable-next-line
const packageJson = require('../package.json');

updateNotifier({ pkg: packageJson, shouldNotifyInNpmScript: true }).notify();

const program = new Command()
  .version(packageJson.version)
  .usage(`${chalk.green('<command>')} [options]`)
  .allowUnknownOption();

program
  .command('dev')
  .description('开启调试服务')
  .option('-o, --open <open>', '自动打开编辑器')
  .option('-p, --port <port>', 'dev server 端口')
  .option('-r, --registry <registry>', 'NPM 软件源地址')
  .action(cmd => {
    const options = cleanArgs(cmd);
    dev(options);
  });

program
  .command('release')
  .description('发布物料库')
  .action(release);

program
  .command('dist')
  .description('构建物料库')
  .action(dist);

program
  .command('create-component <name>')
  .description('创建组件')
  .option('-r, --registry <registry>', 'NPM 软件源地址')
  .action(cmd => {
    const options = cleanArgs(cmd);
    return createComponent(name, options);
  });

program
  .command('create-plugin <name>')
  .description('创建插件')
  .option('-r, --registry <registry>', 'NPM 软件源地址')
  .action(cmd => {
    const options = cleanArgs(cmd);
    return createPlugin(name, options);
  });

program
  .command('create-action <name>')
  .description('创建动作')
  .option('-r, --registry <registry>', 'NPM 软件源地址')
  .action(cmd => {
    const options = cleanArgs(cmd);
    return createAction(name, options);
  });

program
  .command('create-container <name>')
  .description('创建页面容器')
  .option('-r, --registry <registry>', 'NPM 软件源地址')
  .action(cmd => {
    const options = cleanArgs(cmd);
    return createContainer(name, options);
  });

program
  .command('create-form-field <name>')
  .description('创建 Schema Field')
  .option('-r, --registry <registry>', 'NPM 软件源地址')
  .action(cmd => {
    const options = cleanArgs(cmd);
    return createFormField(name, options);
  });

program
  .command('create-lib <name>')
  .description('创建物料库')
  .option('-r, --registry <registry>', 'NPM 软件源地址')
  .option('--runtime <runtime>', '运行时 (react | rax)')
  .action(cmd => {
    const options = cleanArgs(cmd);
    return createLib(name, options);
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
