// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyA1DVWwj5PoJmRu2f0RgHOVN3X8YzH85Ag",
  authDomain: "finalstack-b6aea.firebaseapp.com",
  databaseURL: "https://finalstack-b6aea-default-rtdb.firebaseio.com",
  projectId: "finalstack-b6aea",
  storageBucket: "finalstack-b6aea.appspot.com",
  messagingSenderId: "975014453151",
  appId: "1:975014453151:web:ccf66bef9691b26e30a7aa",
  measurementId: "G-S4JTPQRBXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db };
