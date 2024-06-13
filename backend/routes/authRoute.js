import express from "express";
import passport from "passport";
import { User } from "../model/userModel.js";

const router = express.Router();

router.post("/register", function (req, res) {
    
    const { username, password, displayName } = req.body;

    if(!username || !password || !displayName) {
        return res.status(400).send({
            message: "Send all the required data (username, password, displayName)",
        });
    }
    
    User.register({ username: username }, password, async function (error, user) {
        if (error) {
            console.log(error);
            res.status(500).send({
                message: error.message,
            });
        } else {
            console.log(user);
            passport.authenticate("local")(req, res, async function () {
                user.displayName = displayName;
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
