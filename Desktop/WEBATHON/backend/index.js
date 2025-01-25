const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const RegisterModel = require('./models/Register');
const Job_Posting_model = require('./models/JobPosting');
const Organization_RegisterModel = require('./models/OrgRegister');
const Job_Apply_model = require('./models/Applies'); 

mongoose.connect("mongodb://127.0.0.1:27017/srujan");

app.post('/register',(req , res)=>{
    const {name , mail , password , Role} = req.body;
    if(mail){
        RegisterModel.findOne({mail})
        .then(result=>{
            if(result){
                if(result.mail == mail){
                    res.status(200).json("user already exists");
                }
            }else{
                RegisterModel.create({name , mail , password , Role})
                .then(result =>{
                    console.log("user registered successfully:",result);
                    res.status(200).json("Registered successfully");
                })
                .catch(err =>{
                    console.log("error",err);
                    res.status(500).json(err);
                });
            }
        })
    }
});

app.post('/Org_register', async (req, res) => {
    const { name, mail, password, Role } = req.body;
    if (!mail) {
        return res.status(400).json("Email is required");
    }

    try {
        // Check if user exists in Organization_RegisterModel
        const orgUser = await Organization_RegisterModel.findOne({ mail });
        if (orgUser) {
            return res.status(409).json("User already exists in organization");
        }

        // Check if user exists in RegisterModel
        const jobSeeker = await RegisterModel.findOne({ mail });
        if (jobSeeker) {
            return res.status(409).json("User already registered as job seeker");
        }

        // Create new user
        const newUser = await Organization_RegisterModel.create({ name, mail, password, Role });
        console.log("User registered successfully:", newUser);
        return res.status(201).json("Registered successfully");
    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(500).json("Internal server error");
    }
});


app.post('/Organization_login', (req, res) => {
    const { mail, password } = req.body;
    Organization_RegisterModel.findOne({ mail: mail })
        .then(user => {
            if (user) {
                if (user.mail == mail && user.password === password) {
                    const token = jwt.sign({ mail: user.mail }, SECRET_KEY, { expiresIn: "1h" });
                    res.status(200).json({ token });
                } else {
                    res.status(401).json({ message: "Password is incorrect" });
                }
            } else {
                res.status(402).json({ message: "You are not registered" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Internal Server Error", err });
        });
});



app.post('/Login', (req, res) => {
    const { mail, password } = req.body;
    RegisterModel.findOne({ mail: mail })
        .then(user => {
            if (user) {
                if (user.mail == mail && user.password === password) {
                    const token = jwt.sign({ mail: user.mail }, SECRET_KEY, { expiresIn: "1h" });
                    res.status(200).json({ token });
                } else {
                    res.status(401).json({ message: "Password is incorrect" });
                }
            } else {
                res.status(402).json({ message: "You are not registered" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Internal Server Error", err });
        });
});

app.post('/check_mail',(req , res) =>{
    // console.log('Request body:', req.body);
    const {mail} = req.body;
    RegisterModel.findOne({mail})
    .then(result =>{
        if(result){
            if(result.mail == mail){
                res.status(200).json({message:"user exist"});
            }else{
                res.status(402).json("you are not registered");
            }
        }else{
            res.status(400).json("user doesn't exist");
        }
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json(error);
    })
})


const SECRET_KEY = "Vuyyu*@03";

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'srujan9063@gmail.com',
        pass: 'alun aako xknx mgnv'
    }
});

app.post('/sendOTP', (req, res) => {
    const { mail } = req.body;

    // Generate a 6-digit random OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(`Generated OTP: ${otp}`);

    // Send mail with OTP
    const mailOptions = {
        from: 'srujan.vuyyuru1@gmail.com',
        to: mail,
        subject: 'Reset Password Here',
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending OTP:', error);
            res.status(500).json({ message: 'Failed to send OTP', error });
        } else {
            console.log('OTP sent: ' + info.response);
            res.status(200).json({ message: 'OTP sent successfully', otp });
        }
    });
});

app.post('/reset_register',(req , res)=>{
    const {mail , password} = req.body;
    RegisterModel.updateOne({ mail },{$set: {password}})
    .then(result =>{
        if(result.modifiedCount>0){
        console.log("User updated:",result);
        res.status(200).json({message:"user details updated successfully"});
        }else{
            console.log("No matching user found");
            res.status(400).json({ message: 'User not found' });
        }
    })
    .catch(err=> res.json(err));
});

var post_id = 1;

app.post("/job_posting", (req, res) =>{
    const {Job_title,Description, Requirements, Location, Salary_Range ,mail} = req.body;
    Job_Posting_model.create({Job_title,Description, Requirements, Location, Salary_Range,mail , post_id})
    .then(result =>{
        console.log("result",result);
        post_id+=1
        res.status(200).json("Posted Successfully");
    })
    .catch(error =>{
        console.log("error",error)
        res.status(500).json(err);
    })
})

app.get("/job_postings/:mail", (req, res) => {
    const { mail } = req.params; 

    Job_Posting_model.find({mail}) 
        .then(results => {
            if (results.length === 0) {
                return res.status(404).json({ message: "No job postings found for this email" });
            }
            console.log("Results:", results);
            res.status(200).json(results); // Send the retrieved postings as the response
        })
        .catch(error => {
            console.error("Error retrieving job postings:", error);
            res.status(500).json({ error: error.message });
        });
});

app.get("/all_job_postings", (req, res) => {
    Job_Posting_model.find() 
        .then(results => {
            if (results.length === 0) {
                return res.status(404).json({ message: "No job postings found" });
            }
            console.log("All Job Postings:", results);
            res.status(200).json(results);
        })
        .catch(error => {
            console.error("Error retrieving all job postings:", error);
            res.status(500).json({ message: error.message });
        });
});

app.get("/mydata/:mail", (req, res) => {
    const { mail } = req.params; 
    RegisterModel.findOne({mail}) 
        .then(results => {
            if (results.length === 0) {
                return res.status(404).json({ message: "No exists" });
            }else{
                console.log("Results:", results);
                res.status(200).json(results);
            }
           
        })
        .catch(error => {
            console.error("Error retrieving job postings:", error);
            res.status(500).json({ error: error.message });
        });
});

app.get("/checkme/:mail", async (req, res) => {
    const { mail } = req.params;
    try {
        const user = await RegisterModel.findOne({ mail });
        const organization = await Organization_RegisterModel.findOne({ mail });
        
        if (!user && !organization) {
             return res.json({ status: "not_signed_in" });
        } else if (!organization && user) {
             return res.json({ status: "user", Role: 1 });  // Add Role here
        } else if (organization && !user) {
             return res.json({ status: "orga", Role: 2 });  // Add Role here
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.post("/get_post_by_id" , async (req , res) =>{
    var {post_id , mail , Job_title} = req.body;
    const user = await Job_Posting_model.findOne({post_id})
    if(user){
        console.log(user.mail);
        if(user.mail){
            const mailOptions = {
                from: 'srujan.vuyyuru1@gmail.com',
                to: (user.mail),
                subject: 'Job update',
                text: `Congratualtions ${mail} applied to  your job ${Job_title}`,
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending OTP:', error);
                    res.status(500).json({ message: 'Failed to send OTP', error });
                } else {
                    res.status(200).json({ message: 'Applied'});
                }
            });
            // res.status(200).json(user);
        }else{
            res.status(400).json("job not found");
        }
    }else{
        res.status(400).json("null");
    } 
})

app.post("/applied_jobs", async (req, res) => {
    const { from, post_id } = req.body;
  
    try {
      const user = await Job_Posting_model.findOne({ post_id });
      if (!user) {
        return res.status(404).json({ message: "Job posting not found" });
      }
  
      const mail = user.mail;
      var apply_status = "Pending" 
      const inserting = await Job_Apply_model.create({ from, mail, post_id,apply_status });
  
      if (inserting) {
        console.log("inserting", inserting);
        res.status(200).json({ message: "Successfully stored" });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    } catch (err) {
      console.error("Error processing application:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });


    app.get("/get_my_applies/:from", (req, res) => {
    const { from } = req.params; 
    Job_Apply_model.find({from}) 
        .then(results => {
            if (results.length === 0) {
                return res.status(404).json({ message: "No job send from this email" });
            }
            console.log("Results:", results);
            res.status(200).json(results);
        })
        .catch(error => {
            console.error("Error retrieving job postings:", error);
            res.status(500).json({ error: error.message });
        });
    });
  
    app.get("/get_no_of_applications", (req, res) => {
        Job_Apply_model.find()
            .then(results => {
            if (results.length === 0) {
                return res.status(404).json({ message: "No job applications found" });
            }
            console.log("Total applications:", results.length);  // Log the number of applications
            res.status(200).json({ total: results.length });  // Return the total count
            })
            .catch(error => {
            console.error("Error retrieving job applications:", error);
            res.status(500).json({ error: error.message });
            });
        });

    app.get("/get_for_orga/:mail", (req, res) => {
    const { mail } = req.params; 
    Job_Apply_model.find({mail}) 
        .then(results => {
            if (results.length === 0) {
                return res.status(404).json({ message: "No job send from this email" });
            }
            console.log("Results:", results);
            res.status(200).json(results);
        })
        .catch(error => {
            console.error("Error retrieving job postings:", error);
            res.status(500).json({ error: error.message });
        });
    });


app.post("/requested", async (req, res) => {
    const { post_id } = req.body;
try {
    const user = await Job_Posting_model.findOne({ post_id });
    if (!user) {
    res.status(404).json({ message: "Job posting not found" });
    }else{
        res.status(200).json(user);
    }
} catch (err) {
    console.error("Error processing application:", err);
    res.status(500).json({ message: "Server error", error: err.message });
}
});


app.post("/update_apply_status", async (req, res) => {
    const { post_id, status, from, mail } = req.body;

    try {
        // Validate status
        if (!['Accepted', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status. It should be either 'Accepted' or 'Rejected'." });
        }

        // Find the application
        const application = await Job_Apply_model.findOne({ post_id });
        if (!application) {
            return res.status(404).json({ message: "Job application not found" });
        }

        // Check if status is already updated
        if (application.apply_status !== "Pending") {
            return res.status(400).json({ message: "Application status has already been updated" });
        }

        // Update the status
        application.apply_status = status;
        const updatedApplication = await application.save();

        // Send email notification
        const mailOptions = {
            from: 'srujan.vuyyuru1@gmail.com',
            to: from,
            subject: 'Application Status Update',
            text: `Your application status has been updated to '${status}' by ${mail}. Please proceed with the next steps accordingly.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                // Log email failure, but do not fail the request
                return res.status(200).json({
                    message: `Application status updated to '${status}', but email notification failed.`,
                    error: error.message
                });
            } else {
                console.log('Email sent:', info.response);
                return res.status(200).json({
                    message: `Application status updated to '${status}' and notification email sent successfully.`
                });
            }
        });
    } catch (err) {
        console.error("Error updating application status:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});


app.listen(5001, () => {
    console.log("Server is running on port 5001");
});