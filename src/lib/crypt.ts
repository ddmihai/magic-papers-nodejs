import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';
dotenv.config();
const secretKey: string = process.env.ENC_KEY as string;



export function encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}

export function decryptData(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}
