"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptData = encryptData;
exports.decryptData = decryptData;
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_js_1 = __importDefault(require("crypto-js"));
dotenv_1.default.config();
const secretKey = process.env.ENC_KEY;
function encryptData(data) {
    return crypto_js_1.default.AES.encrypt(data, secretKey).toString();
}
function decryptData(ciphertext) {
    const bytes = crypto_js_1.default.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
}
