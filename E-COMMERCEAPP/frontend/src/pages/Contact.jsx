
import React from "react";
import "../App.css"; 
import contactImg from "../assets/contactimg.png"; 

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-heading">Contact Us</h2>

      <div className="contact-content">
        <div className="contact-image">
          <img src={contactImg} alt="Contact Illustration" />
        </div>

        <div className="contact-form">
          <h3>Get in Touch</h3>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
