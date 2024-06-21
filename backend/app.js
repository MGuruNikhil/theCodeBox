import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import 'dotenv/config';
import blogsRoute from "./routes/blogsRoute.js";
import authRoute from "./routes/authRoute.js";
import { User } from "./model/userModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// CORS Configuration
app.use(cors({
    origin: 'https://the-code-box.vercel.app', // Only allow this origin
    methods: ["GET", "POST", "PUT", "DELETE"],
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
    res.send({
        message: "working"
    });
});

app.use('/auth', authRoute);
app.use('/blogs', blogsRoute);

export default app;