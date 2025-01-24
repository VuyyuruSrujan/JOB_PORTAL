import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>JobPortal</h3>
          <p>Connect with top companies and find your dream job today.</p>
          <div className="social-links">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/search">Browse Jobs</Link>
          <Link to="/post">Build Resume</Link>
          <Link to="/about">About Us</Link>
        </div>
        
        <div className="footer-section">
          <h4>Support</h4>
          <Link to="/help">Help Center</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: info@landlease.com</p>
          <p>Phone: +1 234 567 8900</p>
          <p>Address: 123 Business Ave, Suite 100, City, Country</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LandLease. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;