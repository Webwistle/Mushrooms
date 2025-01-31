import React, { useState, useEffect } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { db } from "../firebaseConfig"; // Assuming you have already initialized Firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // Assuming you have a custom auth context
import "../styles/ShoppingCart.css";
import HomeHeader from "./HomeHeader";

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

  const updateQuantity = async (id, delta) => {
    let updatedItems = items
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove items with quantity 0

    setItems(updatedItems);

    // Update Firestore cart
    if (user) {
      const userRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userRef, { cart: updatedItems });
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
                  value={String(item.quantity).padStart(2, "0")} // Adds leading zero like in the image
                  readOnly
                  className="quantity-display"
                />
                <div className="quantity-buttons">
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="up-button"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="down-button"
                  >
                    ▼
                  </button>
                </div>
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
          <div className="coupon">
            <input
              type="text"
              placeholder="Coupon Code"
              className="coupon-input"
            />
            <button className="apply-button">Apply</button>
          </div>

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
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
