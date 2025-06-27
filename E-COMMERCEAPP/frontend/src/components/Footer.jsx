// Footer.jsx
import React from "react";
import "../App.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">

        <div className="footer-column">
          <h3>WOMENZIA.</h3>
          <p>"We believe every woman deserves to feel confident, beautiful, and empowered through the way she dresses."</p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/collection">Collection</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Our Policies</h4>
          <ul>
            <li><a href="#">7 Days Return</a></li>
            <li><a href="#">Exchange Policy</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li><FaPhoneAlt /> +91 98765 43210</li>
            <li><FaEnvelope /> support@womenzia.com</li>
            <li><FaMapMarkerAlt /> New Delhi, India</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="footer-social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} WOMENZIA. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
