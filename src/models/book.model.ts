// create a mongoose schema and use comprehensive fields and validate
import mongoose from 'mongoose';


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    author: {
        type: [String],
        required: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    genre: {
        type: [mongoose.Types.ObjectId],
        ref: 'Genre'
    },
    qty: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



const Book = mongoose.model('Book', bookSchema);
export default Book;