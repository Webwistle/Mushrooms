import React from "react";
import { Heart, Eye } from "lucide-react";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "../styles/item.css";

const Item = ({ id, image, name, price, originalPrice, discount }) => {
  const { user } = useAuth();
  const addToCart = async () => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const userId = user.uid;
    const userRef = doc(db, "users", userId);

    try {
      const userSnap = await getDoc(userRef);
      let cart =
        userSnap.exists() && userSnap.data().cart ? userSnap.data().cart : [];

      // Ensure valid item data
      if (!id || !name || !price) {
        console.error("Invalid item data:", { id, name, price });
        alert("Invalid item data. Please try again.");
        return;
      }

      // Check if item is already in cart
      const itemIndex = cart.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        // Item already in cart, increase quantity
        cart[itemIndex].quantity += 1;
      } else {
        // Item not in cart, add new item
        cart.push({
          id,
          name,
          price,
          quantity: 1, // Ensure image is always defined
          originalPrice: originalPrice || null, // Ensure originalPrice is defined
          discount: discount || null, // Ensure discount is defined
        });
      }

      // Filter out undefined or incomplete items (prevents Firestore error)
      cart = cart.filter((item) => item.id && item.name && item.price);

      // Update Firestore with the updated cart
      await updateDoc(userRef, { cart });
      console.log("Cart updated successfully!", cart);
      alert(`${name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item. Check console for details.");
    }
  };

  return (
    <div className="item-container">
      <div className="item">
        <div className="item-image-container">
          {discount && <span className="discount-badge">-{discount}%</span>}
          <button className="icon-button wishlist">
            <Heart />
          </button>
          <button className="icon-button quick-view">
            <Eye />
          </button>
          <img src={image} alt={name} className="item-image" />
        </div>
        <button className="add-to-cart" onClick={addToCart}>
          Add To Cart
        </button>
      </div>
      <div className="item-details">
        <h3 className="item-name">{name}</h3>
        <div className="price-container">
          <span className="current-price">${price}</span>
          {originalPrice && (
            <span className="original-price">${originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
