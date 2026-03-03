import { create } from 'zustand';

const useWishlistStore = create((set) => ({
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],

  addToWishlist: (product) => {
    set((state) => {
      const exists = state.wishlist.find(item => item.id === product.id);
      if (exists) return state;
      
      const updatedWishlist = [...state.wishlist, product];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return { wishlist: updatedWishlist };
    });
  },

  removeFromWishlist: (productId) => {
    set((state) => {
      const updatedWishlist = state.wishlist.filter(item => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return { wishlist: updatedWishlist };
    });
  },

  isInWishlist: (productId) => {
    const state = useWishlistStore.getState();
    return state.wishlist.some(item => item.id === productId);
  },

  clearWishlist: () => {
    localStorage.removeItem('wishlist');
    set({ wishlist: [] });
  }
}));

export default useWishlistStore;
