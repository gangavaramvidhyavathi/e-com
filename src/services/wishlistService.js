import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get wishlist for current user
export const getWishlist = async () => {
  try {
    const response = await apiClient.get('/wishlist');
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

// Add item to wishlist
export const addToWishlist = async (productId) => {
  try {
    const response = await apiClient.post('/wishlist/items', {
      productId
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (itemId) => {
  try {
    const response = await apiClient.delete(`/wishlist/items/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Check if product is in wishlist
export const isInWishlist = async (productId) => {
  try {
    const response = await apiClient.get(`/wishlist/check/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error checking wishlist:', error);
    throw error;
  }
};

// Clear wishlist
export const clearWishlist = async () => {
  try {
    const response = await apiClient.delete('/wishlist');
    return response.data;
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    throw error;
  }
};

export default apiClient;
