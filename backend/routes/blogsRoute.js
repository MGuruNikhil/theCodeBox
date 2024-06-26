import express from "express";
import passport from "passport";
import { Blog } from "../model/blogModel.js";

const router = express.Router();

router.post("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { title, body } = req.body;
        const currentUser = req.user;

        if (!title || !body) {
            return res.status(400).send({
                message: "Send all the required data (title, body)",
            });
        }

        const newBlog = { title, body, authorId: currentUser._id, authorDisplayName: currentUser.displayName };
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

        blogs.forEach(blog => {
            blog.body = blog.body.substring(0, 100);
        });

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

router.put("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;
        const currentUser = req.user;

        if (!title || !body) {
            return res.status(400).send({
                message: "Send all the required data (title, body)",
            });
        }

        const oldBlog = await Blog.findById(id);

        if(!oldBlog) {
            return res.status(404).json({
                message: "Blog not found",
            });
        } else {
            if(oldBlog.authorId != currentUser._id) {
                return res.status(403).json({
                    message: "write permissions not given",
                });
            } else {
                oldBlog.title = title;
                oldBlog.body = body;
                oldBlog.authorId = currentUser._id;
                oldBlog.authorDisplayName = currentUser.displayName;
                await oldBlog.save();
                return res.status(200).send({
                    message: "Blog updated successfully",
                });
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message,
        });
    }
});

router.delete("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { id } = req.params;
        const currentUser = req.user;

        const result = await Blog.findById(id);

        if(!result) {
            return res.status(404).json({
                message: "Blog not found",
            });
        }

        if(result.authorId != currentUser._id) {
            return res.status(403).json({
                message: "write permissions not given",
            });
        }

        await Blog.findByIdAndDelete(id);

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
