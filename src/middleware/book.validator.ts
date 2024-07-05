import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';



// Middleware to validate and sanitize 'username' field
export const validateBook = [
    body('title').isString().withMessage('Title should not be empty').isLength({ min: 4 }),
    body('description').isString().withMessage('The description should not be empty').isLength({ min: 4 }),
    body('price').isNumeric().withMessage('The price should not be a number'),
    body('genre').isMongoId().withMessage('The genre should is not valid'),
    body('qty').isNumeric().withMessage('The introduced quantity is not valid'),





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
