import mongoose from "mongoose";
import bcrypt from 'bcryptjs';





const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
    },

    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    role: {
        type: String,
        default: "user"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});



userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});





const User = mongoose.model('User', userSchema);
export default User;


