import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import useWishlistStore from '../store/wishlistStore';
import useCartStore from '../store/cartStore';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlist.some(item => item.id === product.id));
  }, [wishlist, product.id]);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
        <button 
          className="wishlist-btn"
          onClick={handleWishlistToggle}
          title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlist ? (
            <AiFillHeart size={24} color="#FF6B6B" />
          ) : (
            <AiOutlineHeart size={24} />
          )}
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description.substring(0, 60)}...</p>

        <div className="product-footer">
          <div className="price-rating">
            <span className="price">${product.price.toFixed(2)}</span>
            <span className="rating">⭐ {product.rating?.rate || 4.5}</span>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
