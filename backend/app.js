import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from 'connect-mongo'
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import 'dotenv/config';
import blogsRoute from "./routes/blogsRoute.js";
import authRoute from "./routes/authRoute.js";
import { User } from "./model/userModel.js";
import { mongoDBURL } from "./config.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// CORS Configuration
app.use(cors());

// Session Configuration
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: mongoDBURL,
    })
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