import { create } from 'zustand';

const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem('cart')) || [],

  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find(item => item.id === product.id);
      let updatedCart;
      
      if (existingItem) {
        updatedCart = state.cart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...product, quantity: 1 }];
      }
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      const updatedCart = state.cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  updateQuantity: (productId, quantity) => {
    set((state) => {
      const updatedCart = state.cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ cart: [] });
  }
}));

export default useCartStore;
