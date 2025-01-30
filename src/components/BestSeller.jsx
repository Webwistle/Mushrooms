import React from "react";
import "../styles/BestSeller.css";
import Item from "./Items";

const BestSeller = ({ items }) => {
  return (
    <div className="best-seller">
      <h2 className="best-title">Best Sellers</h2>
      <div className="best-items">
        {items.map((item,index)=>(
            <Item
            key={index}
            image={item.image}
            name={item.name}
            price={item.price}
            />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
