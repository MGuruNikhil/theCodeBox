import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import 'dotenv/config';
import { PORT, mongoDBURL } from "./config.js";
import blogsRoute from "./routes/blogsRoute.js";
import authRoute from "./routes/authRoute.js";
import { User } from "./model/userModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// CORS Configuration
app.use(cors({
    origin: 'https://the-code-box.vercel.app',
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}));

// Session Configuration
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure cookies in production
        sameSite: 'none', // Required for cross-origin requests
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/auth', authRoute);
app.use('/blogs', blogsRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log("App is listening to port " + PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
