import { logger } from "../../../app";
import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model";
import bcrypt from 'bcryptjs';



export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "Invalid credentials" });
            return;
        };

        const matchPassword = await bcrypt.compare(password, user.password);
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
            (req.session as any).user = userData;

            // save the sessions
            req.session.save();
            res.status(200).json({ message: "Login successful", user: userData });
        }
    }

    catch (error) {
        logger.error(error);
        next(error);
    }
};
