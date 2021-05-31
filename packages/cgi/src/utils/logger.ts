import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import { getConfig } from './config';

let loggerConfig;

export function getLoggerConfig() {
  if (!loggerConfig) {
    const {
      paths: { logsPath },
    } = getConfig();

    loggerConfig = {
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('@vize/cgi'),
          ),
        }),
        new winston.transports.File({
          dirname: logsPath,
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          dirname: logsPath,
          filename: 'combined.log',
        }),
      ],
    };
  }
  return loggerConfig;
}

let logger;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bare = require('cli-color');

function log(
  level: 'info' | 'error' | 'warn' | 'debug' | 'verbose',
  context: string,
  message: string | object,
  meta?: object,
) {
  if (!logger) {
    logger = winston.createLogger(getLoggerConfig());
  }

  const result = `${bare.yellow(`[${context}]`)} ${
    typeof message === 'string' ? message : JSON.stringify(message, null, 2)
  }`;
  return logger[level](result, meta);
}

export function info(appName: string, message: string | object, meta?: object) {
  return log('info', appName, message, meta);
}

export function infoRequest(
  requestId: string,
  appName: string,
  params?: object,
) {
  return log('info', appName, `CGI Request with id: "${requestId}"`, params);
}

export function infoResponse(
  requestId: string,
  appName: string,
  response?: object,
) {
  return log('info', appName, `CGI Response with id: "${requestId}"`, response);
}

export function error(
  appName: string,
  message: string | object,
  meta?: object,
) {
  return log('error', appName, message, meta);
}

export function warn(appName: string, message: string | object, meta?: object) {
  return log('warn', appName, message, meta);
}
