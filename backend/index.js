import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import blogsRoute from "./routes/blogsRoute.js";

const app = express();

// Middleware for parcing request body
app.use(express.json());

app.use(cors());

app.use('/blogs', blogsRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log("App is listening to port "+PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });

