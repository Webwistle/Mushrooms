import React from 'react';
import { Heart, Eye } from 'lucide-react';
import "../styles/item.css";

const Item = ({ image, name, price, originalPrice, discount }) => {
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
        <button className="add-to-cart">Add To Cart</button>
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
