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
    origin: 'https://the-code-box.vercel.app', // Only allow this origin
    credentials: true,
}));

// Session Configuration
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true, // Ensure cookies are only sent over HTTPS
        sameSite: 'none', // Required for cross-origin requests
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function (req, res) {
    res.send('hello world')
});

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

export default app; // Ensure app is exported for serverless deployment
