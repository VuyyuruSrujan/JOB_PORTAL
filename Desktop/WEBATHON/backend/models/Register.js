const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:String,
    mail:String,
    password:String,
    Role:Number,
})

const RegisterModel = mongoose.model("register",UserSchema)
module.exports = RegisterModel;