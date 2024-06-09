import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import 'dotenv/config';
import { PORT, mongoDBURL } from "./config.js";
import blogsRoute from "./routes/blogsRoute.js";
import { User } from "./model/userModel.js";

const app = express();

// Middleware for parcing request body
app.use(express.json());

app.use(cors());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/register", function (req, res) {
    User.register({ username: req.body.username }, req.body.password, async function (error, user) {
        if (error) {
            console.log(error);
            res.status(500).send({
                message: error.message,
            });
        } else {
            console.log(user);
            passport.authenticate("local")(req, res, async function () {
                user.displayName = req.body.displayName;
                user = await user.save();
                res.status(200).send(user);
            });
        }
    });
});

app.post("/login", function (req, res) {

    const user = new User ({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, function (error) {
        if (error) {
            console.log(error);
            res.status(500).send({
                message: error.message,
            });
        } else {
            passport.authenticate("local")(req, res, function() {
                res.status(200).send({
                    message: "Successfully logged in",
                });
            })
        }
    });
});

app.get("/logout", function(req, res) {
    req.logout(function(error) {
        if (error) {
            console.log(error);
            res.status(500).send({
                message: error.message,
            });
        } else {
            res.status(200).send({
                message: "Successfully logged out",
            })
        }
    });
});

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

