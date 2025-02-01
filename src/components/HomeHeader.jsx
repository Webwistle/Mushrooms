import React, { useEffect, useState } from "react";
import "../styles/header.css";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  LogOut,
  X,
  Star,
  ClipboardList,
} from "lucide-react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const styles = {
  nav: {
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E8D8C3",
    borderBottom: "1px solid black",
    position: "relative",
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
    marginRight: "10px",
    position: "relative",
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
    marginLeft: "-50px",
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
    width: "220px",
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
    marginLeft: "150px",
  },
  dropdownMenu: {
    position: "absolute",
    top: "50px",
    right: "0px",
    background: "rgba(0, 0, 0, 0.85)",
    borderRadius: "10px",
    padding: "12px",
    width: "200px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 100,
    color: "white",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s",
    color: "white",
  },
  dropdownItemDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  dropdownSeparator: {
    height: "1px",
    background: "#555",
    margin: "6px 0",
  },
};

const HomeHeader = () => {
  const { user } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const cart = docSnap.data().cart || [];
          const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
          setCartItemCount(totalItems);
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div>
    <div className="base">Mushrooms</div>
    <nav style={styles.nav}>
      <div style={styles.logo}>Exclusive</div>
      <div style={styles.navLinks}>
        <a style={styles.navLink}>Home</a>
        <a style={styles.navLink} onClick={() => navigate("/contact")}>
          Contact
        </a>
        <a style={styles.navLink}>About</a>
        <a style={styles.navLink}>Sign Up</a>
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
        <div style={{ position: "relative" }}>
          <User style={styles.icon} onClick={toggleDropdown} />
          {dropdownOpen && (
            <div style={styles.dropdownMenu}>
              <div style={styles.dropdownItem}>
                <User size={18} onClick={() => navigate("/editprofile")} />
                Manage My Account
              </div>
              <div
                style={{
                  ...styles.dropdownItem,
                  ...styles.dropdownItemDisabled,
                }}
              >
                <ClipboardList size={18} /> My Order
              </div>
              <div style={styles.dropdownItem}>
                <X size={18} /> My Cancellations
              </div>
              <div style={styles.dropdownItem}>
                <Star size={18} /> My Reviews
              </div>
              <div style={styles.dropdownSeparator}></div>
              <div
                style={styles.dropdownItem}
                onClick={() => console.log("Logging out...")}
              >
                <LogOut size={18} /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
    </div>
  );
};

export default HomeHeader;
