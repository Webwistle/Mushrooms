import React from "react";
import "../styles/signupform.css";

const SignupForm = () => {
  return (
    <>
    <div className="form-container">
      <h2 className="form-title">Create an account</h2>
      <p className="form-subtitle">Enter your details below</p>
      <form className="form">
        <input type="text" placeholder="Name" className="form-input" />
        <input type="email" placeholder="Email or Phone Number" className="form-input" />
        <input type="password" placeholder="Password" className="form-input" />
        <button type="button" className="form-button">
          Sign Up
        </button>
        <button type="button" className="google-button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
            className="google-logo"
          />
          Sign up with Google
        </button>
        <p className="login-text">
          Already have an account? <span className="login-link">Log in</span>
        </p>
      </form>
    </div>
    </>
  );
};

export default SignupForm;
