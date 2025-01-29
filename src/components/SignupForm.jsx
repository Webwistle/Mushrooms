import React, { useState } from "react";
import "../styles/signupform.css";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        password,
        mobile,
        pinCode,
        address,
        orders: [], // Empty array for ordered items
      });

      console.log("Document written with ID:", docRef.id);
      alert("Account successfully created!");

      // Clear form fields after successful submission
      setName("");
      setEmail("");
      setPassword("");
      setMobile("");
      setPinCode("");
      setAddress("");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create an account</h2>
      <p className="form-subtitle">Enter your details below</p>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="number" placeholder="Mobile Number" className="form-input" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        <input type="number" placeholder="Pin Code" className="form-input" value={pinCode} onChange={(e) => setPinCode(e.target.value)} required />
        <input type="text" placeholder="Address" className="form-input" value={address} onChange={(e) => setAddress(e.target.value)} required />
        
        <button type="submit" className="form-button">
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
  );
};

export default SignupForm;
