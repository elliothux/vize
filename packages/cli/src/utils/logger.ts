import chalk from "chalk";
import readline from "readline";
import padStart from "string.prototype.padstart";
import EventEmitter from "events";

const events = new EventEmitter();

function _log(type: string, tag: string, message: string) {
  if (message) {
    events.emit("log", {
      message,
      type,
      tag
    });
  }
}

const format = (label: string, msg: string) => {
  return msg
    .split("\n")
    .map((line, i) => {
      return i === 0
        ? `${label} ${line}`
        : padStart(line, chalk.reset(label).length);
    })
    .join("\n");
};

export const chalkTag = (msg: string) =>
  chalk.bgBlackBright.white.dim(` ${msg} `);

export const log = (msg = "", tag: string = null) => {
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
  _log("log", tag, msg);
};

export const info = (msg = "", tag: string = null) => {
  console.log(
    format(chalk.bgBlue.black(" INFO ") + (tag ? chalkTag(tag) : ""), msg)
  );
  _log("info", tag, msg);
};

export const done = (msg = "", tag: string = null) => {
  console.log(
    format(chalk.bgGreen.black(" DONE ") + (tag ? chalkTag(tag) : ""), msg)
  );
  _log("done", tag, msg);
};

export const warn = (msg = "", tag: string = null) => {
  console.warn(
    format(
      chalk.bgYellow.black(" WARN ") + (tag ? chalkTag(tag) : ""),
      chalk.yellow(msg)
    )
  );
  _log("warn", tag, msg);
};

export const error = (msg: any = "", tag: string = null) => {
  console.error(
    format(chalk.bgRed(" ERROR ") + (tag ? chalkTag(tag) : ""), chalk.red(msg))
  );
  _log("error", tag, msg);
  if (msg instanceof Error) {
    console.error(msg.stack);
    _log("error", tag, msg.stack);
  }
};

export const clearConsole = (title?: string | boolean) => {
  if (process.stdout.isTTY) {
    const blank = "\n".repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    if (title) {
      console.log(title);
    }
  }
};
