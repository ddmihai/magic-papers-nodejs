import { Request, Response, NextFunction } from "express";



export const checkIfUserIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req.session as any).user;

        if (user && user.role === 'admin') {
            next();
        }
        else {
            return res.status(403).json({ message: "Unauthorized" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
