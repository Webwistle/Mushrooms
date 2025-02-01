import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "../styles/ShoppingCart.css";
import HomeHeader from "./HomeHeader";
import axios from "axios"; // For sending SMS & Emails via backend

const ShoppingCart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      const getCartItems = async () => {
        const userRef = doc(db, "users", user.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const cart = userSnap.data().cart || [];
            setItems(cart);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };
      getCartItems();
    }
  }, [user]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert("Failed to load Razorpay. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_nKPAWKJBjDN0HX",
      amount: subtotal * 100,
      currency: "INR",
      name: "LexicaAR",
      description: "Shopping Cart Payment",
      handler: async function (response) {
        alert(
          `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
        );
        console.log("Payment Response:", response);

        try {
          // ✅ Fix: Changed to HTTP & added try-catch for debugging
          const res = await axios.post("http://localhost:3000/send-message", {
            userName: user?.displayName || "Ganesh Avupati",
            userEmail: user?.email || "20093cm010@gmail.com",
            userPhone: "6300648016",
            sellerPhone: "9100299634", // Seller contact number
            orderId: response.razorpay_payment_id,
            amount: subtotal,
          });

          console.log("Message sent successfully:", res.data);
        } catch (error) {
          console.error("Error sending message:", error);
          alert("Failed to send message. Check console for details.");
        }
      },
      prefill: {
        name: user?.displayName || "Ganesh Avupati",
        email: user?.email || "20093cm010@gmail.com",
        contact: "6300648016",
      },
      theme: {
        color: "#DB4444",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <HomeHeader />
      <div className="cart-container">
        <div className="cart-header">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>

        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <span>{item.name}</span>
            </div>
            <div>${item.price}</div>
            <div className="quantity-controls">
              <div className="custom-quantity">
                <input
                  type="text"
                  value={String(item.quantity).padStart(2, "0")}
                  readOnly
                  className="quantity-display"
                />
              </div>
            </div>
            <div>${item.price * item.quantity}</div>
          </div>
        ))}

        <div className="cart-actions">
          <button className="action-button">Return To Shop</button>
          <button className="action-button">Update Cart</button>
        </div>

        <div className="cart-total">
          <div className="total-info">
            <h3>Cart Total</h3>
            <div className="total-item">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="total-item">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="total-item total-price">
              <span>Total:</span>
              <span>${subtotal}</span>
            </div>
            <button className="checkout-button" onClick={handlePayment}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
