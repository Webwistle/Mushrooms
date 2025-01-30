import React from 'react';
import Header from '../components/Header';
import FlashSales from '../components/FlashSales';
import BestSeller from '../components/BestSeller';
import Footer from "../components/Footer"
import "../styles/Home.css";
import M1 from "../asserts/m1.jpg";
import M3 from "../asserts/m3.jpeg";
import M5 from "../asserts/m5.jpeg";
import M2 from "../asserts/m2.jpg";

const flashSaleItems = [
  {
    image: M1,
    name: "HAVIT HV-G92 Gamepad",
    price: 120,
    originalPrice: 160,
    discount: 40,
    rating: 4.5,
    reviews: 88
  },
  {
    image: M2,
    name: "AK-900 Wired Keyboard",
    price: 960,
    originalPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75
  },
  {
    image: M3,
    name: "IPS LCD Gaming Monitor",
    price: 370,
    originalPrice: 400,
    discount: 30,
    rating: 4.5,
    reviews: 99
  },
  {
    image: M5,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99
  },
  {
    image: M5,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99
  },
  {
    image: M5,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99
  },
  {
    image: M5,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99
  },
  {
    image: M5,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99
  }
];

const Home = () => {
  return (
    <div className="home">
      <Header />
      <FlashSales items={flashSaleItems} />
      <BestSeller items={flashSaleItems}/>
      <Footer />
    </div>
  );
};

export default Home;