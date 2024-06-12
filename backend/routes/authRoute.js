import express from "express";
import passport from "passport";
import { User } from "../model/userModel.js";

const router = express.Router();

router.post("/register", function (req, res) {
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

router.post("/login", function (req, res) {

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
                let user = req.user;
                res.status(200).send({
                    user: user,
                    message: "Successfully logged in",
                });
            })
        }
    });
});

router.get("/user", function (req, res) {
    if(req.isAuthenticated()) {
        const user = req.user;
        res.status(200).send({
            user: user,
        });
    } else {
        res.status(401).send({
            message: "unauthorized",
        });
    }
});

router.get("/logout", function(req, res) {
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

export default router;
