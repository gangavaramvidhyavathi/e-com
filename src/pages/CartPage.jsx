import React from 'react';
import useCartStore from '../store/cartStore';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import '../styles/CartPage.css';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="empty-message">
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="item-image" />
                
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>

                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <AiOutlineMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <AiOutlinePlus />
                  </button>
                </div>

                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="checkout-btn">Proceed to Checkout</button>
            <button className="continue-shopping-btn">Continue Shopping</button>
            <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
