import express from "express";
import { Blog } from "../model/blogModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { title, author, body } = req.body;

        if (!title || !author || !body) {
            return res.status(400).send({
                message: "Send all the required data (title, author, body)",
            });
        }

        const newBlog = { title, author, body };
        const blog = await Blog.create(newBlog);

        return res.status(201).send(blog);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message,
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find({});

        return res.status(200).send(blogs);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if(!blog) {
            return res.status(404).json({
                message: "Blog not found",
            });
        }

        return res.status(200).send(blog);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, body } = req.body;

        if (!title || !author || !body) {
            return res.status(400).send({
                message: "Send all the required data (title, author, body)",
            });
        }

        const newBlog = { title, author, body };
        const result = await Blog.findByIdAndUpdate(id, newBlog);

        if(!result) {
            return res.status(404).json({
                message: "Blog not found",
            });
        }

        return res.status(200).send({
            message: "Blog updated successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Blog.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).json({
                message: "Blog not found",
            });
        }

        return res.status(200).send({
            message: "Blog deleted successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message,
        });
    }
});

export default router;
