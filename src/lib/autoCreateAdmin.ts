import dotenv from 'dotenv';
import { logger } from '../../app';
import User from '../models/user.model';
dotenv.config();



const createAdmin = async () => {
    try {
        const admin = await User.findOne({ email: process.env.EMAIL_ADDRESS });

        // If there is an admin, break out of the function
        if (admin) return;

        // else, create the admin
        const newAdmin = new User({
            name: process.env.ADMIN_NAME,
            email: process.env.EMAIL_ADDRESS,
            password: process.env.ADMIN_PASSWORD,
            phone: process.env.ADMIN_PHONE,
            role: 'admin'
        });

        const newAdminUser = await newAdmin.save();

        // // check if the admin has not been created and stop the server
        if (!newAdminUser) throw new Error('Admin not created');

        if (newAdminUser) logger.info('Admin created successfully');
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
}

export default createAdmin;