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
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("../../app");
const user_model_1 = __importDefault(require("../models/user.model"));
dotenv_1.default.config();
const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield user_model_1.default.findOne({ email: process.env.EMAIL_ADDRESS });
        // If there is an admin, break out of the function
        if (admin)
            return;
        // else, create the admin
        const newAdmin = new user_model_1.default({
            name: process.env.ADMIN_NAME,
            email: process.env.EMAIL_ADDRESS,
            password: process.env.ADMIN_PASSWORD,
            phone: process.env.ADMIN_PHONE,
            role: 'admin'
        });
        const newAdminUser = yield newAdmin.save();
        // // check if the admin has not been created and stop the server
        if (!newAdminUser)
            throw new Error('Admin not created');
        if (newAdminUser)
            app_1.logger.info('Admin created successfully');
    }
    catch (error) {
        app_1.logger.error(error);
        throw error;
    }
});
exports.default = createAdmin;
