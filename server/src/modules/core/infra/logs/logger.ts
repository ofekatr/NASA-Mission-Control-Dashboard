import config from '@shared/config';
import { Environment } from '@shared/definitions/configs';
import { BasicObject } from '@shared/definitions/general';
import { createLogger, format, transports } from 'winston';

function prettyStringify(obj: BasicObject) {
    return JSON.stringify(obj, null, 2);
}

const myFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${typeof message === 'object' ? prettyStringify(message) : message}`;
});

const defaultConfig = {
    level: 'silly',
    format: format.combine(
        format.timestamp(),
        format.colorize(),
        myFormat,
    ),
    transports: [new transports.Console()],
};

const envToLoggerConfigsMap: Partial<{ [key in Environment]: any }> = {
    test: {
        ...defaultConfig,
        levels: {},
    },
};

const logger = createLogger(
    envToLoggerConfigsMap[config.nodeEnv as Environment] ?? defaultConfig
);

logger.error = (err: any) => {
    if (err instanceof Error)
        logger.log({
            level: 'error',
            message: `${err.stack}`,
        });
    else if (err instanceof Object)
        logger.log({
            level: 'error',
            message: prettyStringify(err),
        });
    else
        logger.log({
            level: 'error',
            message: err,
        });
    return logger;
};

export default logger;