import mongoose from "mongoose";

const genereSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    }
});


const Genre = mongoose.model('Genre', genereSchema);
export default Genre;