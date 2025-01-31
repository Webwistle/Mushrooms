import React from "react";
import { Phone, Mail } from "lucide-react";
import "../styles/ContactForm.css";

const ContactForm = () => {
  return (
    <div className="contact-container">
      {/* Left Section */}
      <div className="contact-info">
        <div className="contact-section">
          <div className="icon-circle">
            <Phone className="contact-icon" color="#db4444" size={24} />
          </div>
          <h3>Call To Us</h3>
          <p>We are available 24/7, 7 days a week.</p>
          <p className="contact-detail">Phone: +8801811112222</p>
          <div className="divider"></div>
        </div>

        <div className="contact-section">
          <div className="icon-circle">
            <Mail className="contact-icon" color="#db4444" size={24} />
          </div>
          <h3>Write To US</h3>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p className="contact-detail">Emails: customer@exclusive.com</p>
          <p className="contact-detail">Emails: support@exclusive.com</p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="contact-form">
        <div className="form-row">
          <input type="text" placeholder="Your Name *" className="form-input" />
          <input
            type="email"
            placeholder="Your Email *"
            className="form-input"
          />
          <input type="tel" placeholder="Your Phone *" className="form-input" />
        </div>
        <textarea
          placeholder="Your Message"
          className="form-textarea"
        ></textarea>
        <button className="submit-button">Send Message</button>
      </div>
    </div>
  );
};

export default ContactForm;
