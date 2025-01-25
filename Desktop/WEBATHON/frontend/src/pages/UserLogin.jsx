import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import './Register.css'

export default function Login() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("mail", mail);
    console.log("password", password);
    
    // Fetch the user status
    const checkResponse = await fetch(`http://localhost:5001/checkme/${mail}`);
    const checking = await checkResponse.json();
    console.log("checking", checking);

    // Handle based on the status from the backend
    if (checking.status === "user") {
      axios.post("http://localhost:5001/login", { mail, password })
        .then(result => {
          if (result.data.token) {
            console.log(result.data.token);
            localStorage.setItem("authToken", result.data.token);
            localStorage.setItem("mail", mail);
            toast.success("Successfully logged in");
            navigate('/user/dashboard', { replace: true });
          } else {
            toast.warning("You are not a job seeker");
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
    } else {
      toast.warning("You can't log in here");
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        <div className="form-group">
          <label><FaUser /> Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setMail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label><FaLock /> Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
        <div className="auth-links">
          <Link to="/forgot">Forgot Password?</Link><br /><br />
          <Link to="/UserRegistration">Don't have an account? Register</Link>
        </div>
      </form>
    </div>
  );
}
