import { Request, Response, NextFunction } from "express";
import User from "../../models/user.model";
import { validationResult } from 'express-validator';
import { logger } from "../../../app";




export default async function userCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, name, password, phone } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        };


        const user = new User({ email, name, password, phone, role: 'user' });
        await user.save();
        return res.status(201).json({ message: 'User created successfully' });
    }

    catch (err) {
        logger.error('Error creating user:', err);
        next(err);
    }
}