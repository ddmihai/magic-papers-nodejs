"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const express_validator_1 = require("express-validator");
// Middleware to validate and sanitize 'username' field
exports.validateUser = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
    (0, express_validator_1.body)('name').isAlpha().withMessage('Name must contain only letters').notEmpty(),
    (0, express_validator_1.body)('password').isString().withMessage('Please provide a password').notEmpty().isLength({ min: 10 }).withMessage('Password should have at least 10 characters'),
    (0, express_validator_1.body)('phone').isString().withMessage('Please enter a valid phone number').notEmpty().withMessage('Phone number is required').isLength({ max: 11 }),
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
