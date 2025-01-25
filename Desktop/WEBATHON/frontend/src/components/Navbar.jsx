import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaBriefcase, FaUser, FaEnvelope, FaSignOutAlt, FaSignInAlt, FaHome } from 'react-icons/fa';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isloggedin, setisloggedin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check authToken on component mount
    const authToken = localStorage.getItem('authToken');
    setisloggedin(!!authToken);

    // Listen for changes in localStorage
    const handleStorageChange = () => {
      const updatedAuthToken = localStorage.getItem('authToken');
      setisloggedin(!!updatedAuthToken);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = (event) => {
    event.preventDefault();
    navigate('/', { replace: true });
    localStorage.removeItem('authToken');
    localStorage.removeItem('mail');
    setisloggedin(false); // Update state directly
    toast.info('Logged out successfully!');
  };

  const handleLogInClick = () => {
    setShowModal(true);
  };

  const closeModal = (e) => {
    if (e.target.id === 'modal-overlay') {
      setShowModal(false);
    }
  };

  const UserLoginRedi = () => {
    setShowModal(false);
    navigate('/user/login');
  };

  const OrgLoginRedi = () => {
    setShowModal(false);
    navigate('/org/login');
  };
  async function CheckProfile() {
    try {
        const mail = localStorage.getItem("mail");
        if (!mail) {
            toast.warning("Login first");
        } else {
            const response = await axios.get(`http://localhost:5001/checkme/${mail}`);
            console.log("check", response.data.status); // Logs the response status
            
            if (response.data.status === "user") {
                navigate("/profile");
            } else if (response.data.status === "orga") {
                navigate("/OrganizationProfile");
            } else {
                toast.warning("No user or organization found");
            }
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong, please try again.");
    }
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
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FaHome /> Home
          </Link>
          <Link to="/jobs" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Browse Jobs
          </Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FaEnvelope />
            Contact
          </Link>

          <Link className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <FaUser />
            <p onClick={CheckProfile}> Profile </p>
          </Link>

          {isloggedin ? (
            <Link className="nav-link" onClick={handleLogOut}>
              <FaSignOutAlt /> Logout
            </Link>
          ) : (
            <Link className="nav-link" onClick={handleLogInClick}>
              <FaSignInAlt /> Login
            </Link>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <div id="modal-overlay" className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="login-box" onClick={UserLoginRedi}>
              <h3>User Login</h3>
              <p>Login form for users</p>
            </div>
            <div className="login-box" onClick={OrgLoginRedi}>
              <h3>Organization Login</h3>
              <p>Login form for organizations</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

