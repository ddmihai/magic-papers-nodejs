"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBook = void 0;
const express_validator_1 = require("express-validator");
// Middleware to validate and sanitize 'username' field
exports.validateBook = [
    (0, express_validator_1.body)('title').isString().withMessage('Title should not be empty').isLength({ min: 4 }),
    (0, express_validator_1.body)('description').isString().withMessage('The description should not be empty').isLength({ min: 4 }),
    (0, express_validator_1.body)('price').isNumeric().withMessage('The price should not be a number'),
    (0, express_validator_1.body)('genre').isMongoId().withMessage('The genre should is not valid'),
    (0, express_validator_1.body)('qty').isNumeric().withMessage('The introduced quantity is not valid'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array().map((err) => ({
                    field: err.path,
                    message: err.msg,
                }))
            });
        }
        next();
    }
];
