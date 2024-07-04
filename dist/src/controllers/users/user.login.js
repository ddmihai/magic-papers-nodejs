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
exports.userLogin = void 0;
const app_1 = require("../../../app");
const user_model_1 = __importDefault(require("../../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "Invalid credentials" });
            return;
        }
        ;
        const matchPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!matchPassword)
            return res.status(401).json({ message: "Invalid credentials" });
        if (user.role === 'banned')
            return res.status(401).json({ message: "Your account has been suspended." });
        else {
            const userData = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            // create sessions
            req.session.user = userData;
            // save the sessions
            req.session.save();
            res.status(200).json({ message: "Login successful", user: userData });
        }
    }
    catch (error) {
        app_1.logger.error(error);
        next(error);
    }
});
exports.userLogin = userLogin;
