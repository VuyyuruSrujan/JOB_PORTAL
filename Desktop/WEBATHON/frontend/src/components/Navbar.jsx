import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaBriefcase, FaUser, FaBuilding, FaSearch, FaBlog, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function HandleLogOut(){
    event.preventDefault();
      navigate('/', {replace:true});
      localStorage.removeItem("authToken");
      localStorage.removeItem("mail");
      toast.info('logged out successfully!');
  }

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

        <div className="hamburger-menu" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className="hamburger-icon" /> : <FaBars className="hamburger-icon" />}
        </div>

        <motion.div
          className={`nav-links ${isMenuOpen ? 'show' : ''}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/jobs" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FaSearch />
            Browse Jobs
          </Link>
          <Link to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FaBlog />
            Blog
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FaInfoCircle />
            About
          </Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FaEnvelope />
            Contact
          </Link>
          <Link to="/user/login" className="nav-link">
            <FaUser />
            User Login
          </Link>
          <Link to="/org/login" className="nav-link">
            <FaBuilding />
            Organization Login
          </Link>
          <Link className="nav-link" onClick={HandleLogOut}>
           Logout
          </Link>
        </motion.div>

        {/* <motion.div
          className="auth-buttons"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', gap: '1rem' }}
        >
          
          
        </motion.div> */}
      </div>
    </nav>
  );
}
