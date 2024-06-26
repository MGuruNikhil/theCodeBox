import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorDisplayName: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Blog = mongoose.model('Blog', blogSchema);
