import * as path from 'path';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import { getConfig } from './config';
import { TransformFunction } from 'logform';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DailyRotateFile = require('winston-daily-rotate-file');

let loggerConfig;

const format = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.json(),
);

class CGIFormat {
  public transform: TransformFunction = info => {
    const { message } = info;
    info.message =
      typeof message === 'string' ? message : JSON.stringify(message, null, 2);
    return info;
  };
}

export function getLoggerConfig() {
  if (!loggerConfig) {
    const {
      paths: { logsPath },
    } = getConfig();

    loggerConfig = {
      transports: [
        new DailyRotateFile({
          format,
          dirname: path.resolve(logsPath, 'all'),
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '50m',
          maxFiles: '15d',
          timestamp: true,
        }),
        new DailyRotateFile({
          format,
          level: 'error',
          dirname: path.resolve(logsPath, 'error'),
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '50m',
          maxFiles: '15d',
          timestamp: true,
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.ms(),
            new CGIFormat(),
            nestWinstonModuleUtilities.format.nestLike('@vize/cgi'),
          ),
        }),
      ],
    };
  }
  return loggerConfig;
}

let logger;

function log(
  level: 'info' | 'error' | 'warn' | 'debug' | 'verbose',
  context: string,
  message: string | object,
  meta?: object,
) {
  if (!logger) {
    logger = winston.createLogger(getLoggerConfig());
  }

  return logger[level]({
    level,
    context,
    message,
    meta,
  });
}

export function info(appName: string, message: string | object, meta?: object) {
  return log('info', appName, message, meta);
}

export function infoRequest(
  requestId: string,
  appName: string,
  params?: object,
) {
  return log('info', appName, `CGI Request with id: "${requestId}"`, {
    params,
    requestId,
  });
}

export function infoResponse(
  requestId: string,
  appName: string,
  response?: object,
) {
  return log('info', appName, `CGI Response with id: "${requestId}"`, {
    response,
    requestId,
  });
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
