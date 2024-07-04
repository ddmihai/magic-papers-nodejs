import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();




const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL!)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


export default connectDatabase;