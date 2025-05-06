import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import HomeHeader from "./HomeHeader";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(
        userRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            // Get the orders array from the user document
            const ordersData = data.orders || [];
            setOrders(ordersData);
          } else {
            console.warn("No such document for user:", user.uid);
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    } else {
      console.warn("No user logged in.");
      setLoading(false);
    }
  }, [user]);

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div>
    <HomeHeader />
      <div style={{ padding:"20px" }}>
      <h2>My Orders</h2>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((order, orderIndex) => (
            <div
              key={orderIndex}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: "#f9f9f9",
                margin:"10px",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <p><strong>Order Date:</strong> {formatDate(order.date)}</p>
              </div>
              
              <h3>Order Items</h3>
              {order.items && order.items.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {order.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "12px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <h4>{item.name || "Unnamed Item"}</h4>
                      <p><strong>Original Price:</strong> ₹{item.originalPrice || 0}</p>
                      <p><strong>Price:</strong> ₹{item.price || 0}</p>
                      {item.discount && <p><strong>Discount:</strong> {item.discount}</p>}
                      <p><strong>Item ID:</strong> {item.id}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No items in this order.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;