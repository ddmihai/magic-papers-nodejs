"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const connection_1 = __importDefault(require("./src/database/connection"));
const port = process.env.PORT || 3000;
const startserver = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const server = http_1.default.createServer(app_1.default);
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        // Others functions here
        yield (0, connection_1.default)();
    }
    catch (error) {
        console.error(error);
    }
});
startserver();
