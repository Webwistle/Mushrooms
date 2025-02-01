import React from "react";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";

const styles = {
  container: {
    display: "flex",
    backgroundColor: "#F4E3D3",
    height: "100vh",
    padding: "40px",
    fontFamily: "'Poppins', sans-serif",
  },
  sidebar: {
    width: "250px",
    padding: "20px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },
  sectionTitle: {
    marginBottom: "15px",
    fontWeight: "600",
    color: "#333",
  },
  menuItem: {
    color: "#8F8F8F",
    textDecoration: "none",
    display: "block",
    marginBottom: "10px",
    cursor: "pointer",
  },
  activeMenuItem: {
    color: "red",
    fontWeight: "600",
  },
  profileContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: "20px",
    width: "400px",
    borderRadius: "8px",
    maxHeight: "500px",
    overflow: "auto",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "red",
    marginBottom: "20px",
  },
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  inputGroup: {
    flex: 1,
    marginRight: "20px",
  },
  label: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#333",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    border: "none",
    background: "transparent",
    fontSize: "15px",
    color: "#333",
    fontWeight: "500",
    outline: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "30px",
  },
  cancelButton: {
    marginRight: "20px",
    color: "#8F8F8F",
    fontWeight: "500",
    fontSize: "15px",
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#4B3222",
    color: "#FFFFFF",
    border: "none",
    padding: "10px 40px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const EditProfile = () => {
  return (
    <>
      <HomeHeader />
      <div style={styles.container}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sectionTitle}>Manage My Account</div>
          <div style={{ ...styles.menuItem, ...styles.activeMenuItem }}>
            My Profile
          </div>
          <div style={styles.sectionTitle}>My Orders</div>
          <div style={styles.menuItem}>My Returns</div>
          <div style={styles.menuItem}>My Cancellations</div>
          <div style={styles.sectionTitle}>My Wishlist</div>
        </div>

        {/* Profile Edit Form */}
        <div style={styles.profileContainer}>
          <div style={styles.title}>Edit Your Profile</div>

          <div style={styles.formGroup}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>First Name</label>
              <input type="text" value="Md" readOnly style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Last Name</label>
              <input type="text" value="Rimel" readOnly style={styles.input} />
            </div>
          </div>

          <div style={styles.formGroup}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value="rimel1111@gmail.com"
                readOnly
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Address</label>
              <input
                type="text"
                value="Kingston, 5236, United State"
                readOnly
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <div style={styles.cancelButton}>Cancel</div>
            <button style={styles.saveButton}>Save</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
