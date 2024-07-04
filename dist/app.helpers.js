"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerObj = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logDirectory = path_1.default.join(__dirname, 'src', 'logs'); // logs directory in the current directory
// Create logs directory if it doesn't exist
if (!fs_1.default.existsSync(logDirectory)) {
    fs_1.default.mkdirSync(logDirectory);
}
exports.loggerObj = {
    level: 'info',
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.File({ filename: path_1.default.join(logDirectory, 'error.log'), level: 'error' }), // Logs with 'error' level to logs/error.log
        new winston_1.default.transports.File({ filename: path_1.default.join(logDirectory, 'combined.log') }), // Logs with 'info' level and higher to logs/combined.log
        new winston_1.default.transports.Console({ format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()) })
    ]
};
