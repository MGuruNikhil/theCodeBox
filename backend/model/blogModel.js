import mongoose from "mongoose";

const blogShema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
},{ timestamp: true });

export const Blog = mongoose.model('Blog', blogShema);