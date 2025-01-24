const mongoose = require('mongoose');

const Job_Posting_Schema = new mongoose.Schema({
    Job_title:String,
    Description:String,
    Requirements:String,
    Location:String,
    Salary_Range:String,
    mail:String,
})

const Job_Posting_model = mongoose.model("Job_Postings",Job_Posting_Schema)
module.exports = Job_Posting_model;