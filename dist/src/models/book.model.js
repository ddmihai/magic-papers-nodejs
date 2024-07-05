"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// create a mongoose schema and use comprehensive fields and validate
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    author: {
        type: [String],
        required: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    genre: {
        type: [mongoose_1.default.Types.ObjectId],
        ref: 'Genre'
    },
    qty: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Book = mongoose_1.default.model('Book', bookSchema);
exports.default = Book;
