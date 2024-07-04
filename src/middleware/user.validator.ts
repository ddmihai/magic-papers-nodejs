import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';



// Middleware to validate and sanitize 'username' field
export const validateUser = [

    body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
    body('name').isAlpha().withMessage('Name must contain only letters').notEmpty(),
    body('password').isString().withMessage('Please provide a password').notEmpty().isLength({ min: 10 }).withMessage('Password should have at least 10 characters'),
    body('phone').isString().withMessage('Please enter a valid phone number').notEmpty().withMessage('Phone number is required').isLength({ max: 11 }),




    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array().map((err: any) => ({
                    field: err.path,
                    message: err.msg,
                }))
            });
        }
        next();
    }
];
