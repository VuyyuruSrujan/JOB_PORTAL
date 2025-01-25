const mongoose = require('mongoose');

const OrgRegistration = new mongoose.Schema({
    name:String,
    mail:String,
    password:String,
    Role:Number,
})

const Organization_RegisterModel = mongoose.model("OrgRegistration",OrgRegistration)
module.exports = Organization_RegisterModel;