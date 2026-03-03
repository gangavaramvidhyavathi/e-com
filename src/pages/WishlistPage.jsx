import React from 'react';
import useWishlistStore from '../store/wishlistStore';
import { AiOutlineDelete, AiOutlineShoppingCart } from 'react-icons/ai';
import useCartStore from '../store/cartStore';
import '../styles/WishlistPage.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page empty-wishlist">
        <div className="empty-message">
          <h2>Your wishlist is empty</h2>
          <p>Start adding items to your wishlist</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <span className="wishlist-count">({wishlist.length} items)</span>
        </div>

        <div className="wishlist-items">
          {wishlist.map(item => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.title} className="item-image" />
              
              <div className="item-content">
                <h3>{item.title}</h3>
                <p className="item-category">{item.category}</p>
                <p className="item-description">{item.description.substring(0, 100)}...</p>
                
                <div className="item-footer">
                  <div className="price-rating">
                    <span className="price">${item.price.toFixed(2)}</span>
                    <span className="rating">⭐ {item.rating?.rate || 4.5}</span>
                  </div>
                </div>
              </div>

              <div className="item-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(item)}
                  title="Add to cart"
                >
                  <AiOutlineShoppingCart size={20} />
                  Add to Cart
                </button>

                <button 
                  className="remove-btn"
                  onClick={() => removeFromWishlist(item.id)}
                  title="Remove from wishlist"
                >
                  <AiOutlineDelete size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="wishlist-actions">
          <button className="clear-wishlist-btn" onClick={clearWishlist}>
            Clear Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
