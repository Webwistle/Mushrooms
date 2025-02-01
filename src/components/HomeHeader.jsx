import React, { useEffect, useState } from "react";
import "../styles/header.css";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Assuming you have a custom auth context

const styles = {
  nav: {
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E8D8C3",
    borderBottom: "1px solid black",
  },
  navLinks: {
    display: "flex",
    gap: "39px",
    flex: 1,
    justifyContent: "center",
  },
  navLink: { textDecoration: "none", color: "black", transition: "color 0.3s" },
  iconsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginRight: "10px", // Adjusted to move icons slightly left
  },
  icon: {
    width: "24px",
    height: "24px",
    cursor: "pointer",
    color: "black",
    transition: "color 0.3s",
  },
  searchContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginLeft: "-50px", // Moved search input left
  },
  searchInput: {
    paddingLeft: "14px",
    paddingRight: "36px",
    paddingTop: "8px",
    paddingBottom: "8px",
    borderRadius: "6px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "220px", // Reduced width slightly
  },
  searchIcon: {
    position: "absolute",
    right: "10px",
    width: "20px",
    height: "20px",
    color: "black",
  },
  logo: {
    fontSize: "34px",
    fontWeight: "bold",
    marginLeft: "150px", // Adjusted to keep balance
  },
};

const HomeHeader = () => {
  const { user } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();
  const handleCartClick = () => {
    navigate("/cart"); // Navigate to the cart page
  };
  const handlecontact = () => {
    navigate("/contact");
  };

  useEffect(() => {
    if (user) {
      // Set up the real-time listener for the user's cart
      const userRef = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const cart = docSnap.data().cart || [];
          const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
          setCartItemCount(totalItems);
        }
      });

      // Cleanup the listener when the component unmounts
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div>
    <div className="base">Mushrooms</div>
    <nav style={styles.nav}>
      <div style={styles.logo}>Exclusive</div>
      <div style={styles.navLinks}>
        <a href="#" style={styles.navLink}>
          Home
        </a>
        <a href="#" style={styles.navLink} onClick={handlecontact}>
          Contact
        </a>
        <a href="#" style={styles.navLink}>
          About
        </a>
        <a href="#" style={styles.navLink}>
          Sign Up
        </a>
      </div>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="What are you looking for?"
          style={styles.searchInput}
        />
        <Search style={styles.searchIcon} />
      </div>
      <div style={styles.iconsContainer}>
        <Heart style={styles.icon} />
        <div style={{ position: "relative" }} onClick={handleCartClick}>
          <ShoppingCart style={styles.icon} />
          {cartItemCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                backgroundColor: "red",
                color: "white",
                fontSize: "12px",
                borderRadius: "50%",
                padding: "2px 6px",
              }}
            >
              {cartItemCount}
            </span>
          )}
        </div>
        <User style={styles.icon} />
      </div>
    </nav>
    </div>
  );
};

export default HomeHeader;
