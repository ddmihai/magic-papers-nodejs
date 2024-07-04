import { Request, Response, NextFunction } from "express";
import User from "../../models/user.model";
import { validationResult } from 'express-validator';
import { logger } from "../../../app";


const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    }

    catch (error) {
        logger.error(error);
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
};

export default getAllUsers;