import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBriefcase, FaUser, FaBuilding, FaSearch, FaBlog, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="logo-container">
            <FaBriefcase className="logo-icon" />
            <span>JobPortal</span>
          </Link>
        </motion.div>
        
        <motion.div
          className="nav-links"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/jobs" className="nav-link">
            <FaSearch />
            Browse Jobs
          </Link>
          <Link to="/blog" className="nav-link">
            <FaBlog />
            Blog
          </Link>
          <Link to="/about" className="nav-link">
            <FaInfoCircle />
            About
          </Link>
          <Link to="/contact" className="nav-link">
            <FaEnvelope />
            Contact
          </Link>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', gap: '1rem' }}
        >
          <Link to="/user/login" className="btn btn-primary">
            <FaUser />
            User Login
          </Link>
          <Link to="/org/login" className="btn btn-primary">
            <FaBuilding />
            Organization Login
          </Link>
        </motion.div>
      </div>
    </nav>
  );
}