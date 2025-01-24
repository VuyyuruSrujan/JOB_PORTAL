import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaUser, FaBuilding } from 'react-icons/fa';

function Landing() {
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
          <Link to="/user/login" className="btn btn-primary">
            <FaUser />
            Job Seeker
            <FaArrowRight />
          </Link>
          <Link to="/org/login" className="btn btn-primary">
            <FaBuilding />
            Employer
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Landing;