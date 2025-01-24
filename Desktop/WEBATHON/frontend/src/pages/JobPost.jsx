import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import './JobPost.css';
import axios from 'axios';

function JobPost() {
const [Job_title, setJob_title] = useState("");
const [Description, setDescription] = useState("");
const [Requirements, setRequirements] = useState("");
const [Location , setLocation] = useState("");
const [Salary_Range , setSalary_Range] = useState("");

  const navigate = useNavigate();
  useEffect(()=>{
    var mail = localStorage.getItem("mail");
    if(!mail){
      navigate('/');
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!Job_title || !Description || !Requirements || !Location || !Salary_Range){
      toast.warning("enter all details")
    }else{
      var mail = localStorage.getItem("mail");
      console.log("posting",Job_title , Description , Requirements , Location , Salary_Range ,mail);
      axios.post("http://localhost:5001/job_posting",{Job_title , Description , Requirements , Location , Salary_Range , mail})
      .then(result =>{
        console.log("result",result);
        toast.success(result.data);
      })
    };
  };

 async function MyAllPosts(){
  // var AllPosts = await fetch(`http://localhost:5001/job_postings/${mail}`)
  navigate('/AllPosts');
 }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ marginBottom: '2rem' }}>Post a New Job</h2>
<<<<<<< HEAD
      <button className='MyAllPost' onClick={MyAllPosts}>My All Posts</button>
=======
      <button className="MyAllPost" onClick={MyAllPosts}>My All Posts</button>
>>>>>>> 7b0cab97f9f4417f437dd44428bef5398d639a99
      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            onChange={(e) =>setJob_title(e.target.value)}
            placeholder="Enter job title"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            onChange={(e) =>setDescription(e.target.value)}
            placeholder="Enter job description"
            style={{ width: '100%', minHeight: '100px', padding: '0.5rem' }}
          />
        </div>
        <div className="form-group">
          <label>Requirements</label>
          <textarea
            name="requirements"
            onChange={(e) =>setRequirements(e.target.value)}
            placeholder="Enter job requirements"
            style={{ width: '100%', minHeight: '100px', padding: '0.5rem' }}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            onChange={(e) =>setLocation(e.target.value)}
            placeholder="Enter job location"
          />
        </div>
        <div className="form-group">
          <label>Salary Range</label>
          <input
            type="text"
            name="salary"
            onChange={(e) =>setSalary_Range(e.target.value)}
            placeholder="Enter salary range"
          />
        </div>
        <motion.button
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ width: '100%' }}
        >
          Post Job
        </motion.button>
      </form>
    </motion.div>
  );
}

export default JobPost;