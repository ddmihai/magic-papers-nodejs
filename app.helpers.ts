import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDirectory = path.join(__dirname, 'src', 'logs'); // logs directory in the current directory



// Create logs directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}


export const loggerObj = {
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),  // Logs with 'error' level to logs/error.log
        new winston.transports.File({ filename: path.join(logDirectory, 'combined.log') }),               // Logs with 'info' level and higher to logs/combined.log
        new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })
    ]
}


