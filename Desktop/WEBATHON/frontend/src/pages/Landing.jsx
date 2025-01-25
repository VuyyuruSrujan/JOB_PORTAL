import { motion } from 'framer-motion';
import { FaArrowRight, FaUser, FaBuilding } from 'react-icons/fa';
import './Landing.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  function checkAlreadyLogin() {
    try {
      const see = localStorage.getItem("authToken");
      if (see) {
        toast.warning("You are already logged in");
      } else {
        navigate("/UserRegistration");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function checkAlreadyLoginEmp() {
    try {
      const see = localStorage.getItem("authToken");
      if (see) {
        toast.warning("You are already logged in");
      } else {
        navigate("/org/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <motion.h1
          className="landing-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Your Career Journey Starts Here
        </motion.h1>
        
        <motion.p
          className="landing-subtitle"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Connect with top companies and find your dream job today
        </motion.p>
        
        <motion.div
          className="landing-buttons"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="btn btn-primary" onClick={checkAlreadyLogin}>
            <FaUser />
            <p>Job Seeker</p>
            <FaArrowRight />
          </div>
          <div className="btn btn-primary" onClick={checkAlreadyLoginEmp}>
            <FaBuilding />
            <p>Employer</p>
            <FaArrowRight />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Landing;
