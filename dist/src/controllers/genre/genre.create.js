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
const genere_model_1 = __importDefault(require("../../models/genere.model"));
const app_1 = require("../../../app");
const createGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        // validate 
        if (!name || !description || name.trim() === '' || description.trim() === '') {
            return res.status(400).json({ message: 'Name and description are required fields' });
        }
        // Check if already exist
        const existingGenre = yield genere_model_1.default.findOne({ name: name.trim().toLowerCase() });
        if (existingGenre) {
            return res.status(400).json({ message: 'Genre already exists' });
        }
        ;
        const genre = yield genere_model_1.default.create({ name, description });
        res.status(201).json(genre);
    }
    catch (err) {
        app_1.logger.error(err);
        res.status(500).json({ message: err });
    }
});
exports.default = createGenre;
