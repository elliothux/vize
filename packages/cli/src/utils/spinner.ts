import ora from 'ora';
import chalk from 'chalk';

const spinner = ora();
let lastMsg: { symbol: string; text: string } | null = null;

const logWithSpinner = (symbol: any, msg: any) => {
    if (!msg) {
        msg = symbol;
        symbol = chalk.green('✔');
    }
    if (lastMsg) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: lastMsg.text,
        });
    }
    spinner.text = ` ${msg}`;
    lastMsg = {
        symbol: `${symbol} `,
        text: msg,
    };
    spinner.start();
};

const stopSpinner = (persist?: boolean) => {
    if (lastMsg && persist !== false) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: lastMsg.text,
        });
    } else {
        spinner.stop();
    }
    lastMsg = null;
};

const pauseSpinner = () => {
    spinner.stop();
};

const resumeSpinner = () => {
    spinner.start();
};

export { logWithSpinner, stopSpinner, pauseSpinner, resumeSpinner };
