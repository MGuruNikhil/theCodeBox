import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    displayName: String
});

userSchema.plugin(passportLocalMongoose);

export const User = new mongoose.model("User", userSchema);
