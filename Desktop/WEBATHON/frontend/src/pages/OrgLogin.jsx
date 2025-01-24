import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import './Register.css'

export default function OrgLogin() {
  const navigate = useNavigate();
  const [mail , setmail] = useState("");
 const [password , setpassword] = useState("");

 function handleSubmit(){
  event.preventDefault();
  console.log("mail",mail);
  console.log("password",password);
  axios.post("http://localhost:5001/login" , {mail , password})
  .then(result => {
    if(result.data.Role == 2){
    if(result.data.token){
        console.log((result.data.token))
        localStorage.setItem("authToken", result.data.token);
        localStorage.setItem("mail",mail);
        toast.success("successfully logged in")
        navigate('/org/dashboard',{replace:true});
    }
  }else{
    toast.warning("you are not a admin")
  }
})

.catch(error => {
    if (error.response) {
        toast.warning(error.response.data.message || "An error occurred");
    } else if (error.request) {
      toast.warning("No response received from server");
    } else {
      toast.warning("Error: " + error.message);
    }
});
 }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Organization Login</h2>
        <div className="form-group">
          <label><FaUser /> Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) =>setmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label><FaLock /> Password</label>
          <input
            type="password"
            name="password"
            onChange={(e)=>setpassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
        <div className="auth-links">
          <Link to="/forgot">Forgot Password?</Link><br /><br />
          <Link to="/UserRegistration">Don't have account ? Register</Link>
        </div>
      </form>
    </div>
  );
}