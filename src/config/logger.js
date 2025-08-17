import winston from "winston"
import { env } from "../utils/env.js"

// Define custom log level
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

// NOw, determine the log level
const level = () => {
    return env.NODE_ENV === 'development' ? 'debug' : 'warn';
};

// Now, define colors
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
}

winston.addColors(colors);

// Now, define the format for log message
const format = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY_MM_DD HH:mm:ss:ms'
    }),
    winston.format.colorize({
        all: true
    }),
    winston.format.printf((info) => {
        return `${info.timestamp} ${info.level}: ${info.message}`
    }),
);

// Now, define the transport for the logs
const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error'
    }),
    // Log everythings
    new winston.transports.File({
        filename: 'logs/all.log'
    })
];

// Now create new logger instance

const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports
});

export default logger;