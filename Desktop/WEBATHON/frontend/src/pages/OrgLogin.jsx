import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import './Register.css';

export default function OrgLogin() {
  const navigate = useNavigate();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      // Validate email existence and type
      // const checkResponse = await axios.get(`http://localhost:5001/checkme/${mail}`);
      // const checkData = checkResponse.data;

      // if (checkData === 'orga') {
        // Proceed to login if the user is an organization
        const loginResponse = await axios.post('http://localhost:5001/Organization_login', { mail, password });
        if (loginResponse.data.token) {
          localStorage.setItem('authToken', loginResponse.data.token);
          localStorage.setItem('mail', mail);
          toast.success('Successfully logged in');
          navigate('/org/dashboard', { replace: true });
        } else {
          toast.warning('You are not an admin');
        }
      //  else if (checkData === 'not signed in') {
      //   toast.warning("You're not registered as an organization");
      // } else {
      //   toast.warning("You can't log in here");
      // }
    } catch (error) {
      // Error handling
      if (error.response) {
        toast.warning(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        toast.warning('No response received from the server');
      } else {
        toast.warning('Error: ' + error.message);
      }
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Organization Login</h2>
        <div className="form-group">
          <label>
            <FaUser /> Email
          </label>
          <input
            type="email"
            name="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <FaLock /> Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <div className="auth-links">
          <Link to="/forgot">Forgot Password?</Link>
          <br />
          <br />
          <Link to="/OrganizationReg">Don't have an account? Register</Link>
        </div>
      </form>
    </div>
  );
}
