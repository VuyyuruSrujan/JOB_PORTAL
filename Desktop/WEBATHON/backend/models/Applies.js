const mongoose = require('mongoose');

const Applies = new mongoose.Schema({
    from:String,
    mail:String,
    post_id:Number,
    apply_status:String,
})

const Job_Apply_model = mongoose.model("job_applyings",Applies)
module.exports = Job_Apply_model;