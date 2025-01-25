import { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import axios from "axios";
import './Register.css';

export default function OrganizationReg() {
  const navigate = useNavigate();
  const [name , setReg_nm] = useState("");
  const [mail , setmail] = useState("");
  const [password , setpassowrd] = useState("");
  const [confirm_pass , set_confirm_pass] = useState("");

  // useEffect(()=>{
  //   var session = localStorage.getItem("authToken");
  //   if(session){
  //     navigate('/todo');
  //   }
  // });

  function Register_user(event) {
    event.preventDefault();

    if (password !== confirm_pass) {
        toast.warning("Password and confirm password must be the same");
        return;
    }

    if (password.length < 8) {
        toast.warning("Password must have at least 8 characters");
        return;
    }

    axios
        .post('http://localhost:5001/Org_register', { name, mail, password, Role: 2 })
        .then((response) => {
            console.log("Response:", response);
            if (response.status === 201) {
                toast.success(response.data);
                navigate('/org/login');
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            if (error.response && error.response.status === 409) {
                toast.warning(error.response.data);
            } else {
                toast.error("Registration failed. Please try again later.");
            }
        });
}

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={Register_user}>
        <h2>Create Account</h2>
        <div className="form-group">
          <label><FaUser /> Name</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={(e)=>setReg_nm(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label><FaEnvelope /> Email</label>
          <input
            type="email"
            name="email"
            onChange={(e)=>setmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label><FaLock /> Password</label>
          <input
            type="password"
            name="password"
            onChange={(e)=>setpassowrd(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label><FaLock /> Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={(e)=>set_confirm_pass(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Register</button>
        <div className="auth-links">
          <Link to="/org/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
}