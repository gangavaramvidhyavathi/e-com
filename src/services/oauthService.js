import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// OAuth Service for authentication with backend
const authClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Register a new user
export const registerUser = async (name, email, password) => {
  try {
    const response = await authClient.post('/auth/register', {
      name,
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error.response?.data || error;
  }
};

// Login user with email and password
export const loginUser = async (email, password) => {
  try {
    const response = await authClient.post('/auth/login', {
      email,
      password
    });
    
    const { token, user } = response.data;
    
    // Store token
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { token, user };
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data || error;
  }
};

// Get current user
export const getCurrentUser = async (token) => {
  try {
    const response = await authClient.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('user');
};

// Update user profile
export const updateUserProfile = async (userId, name, email) => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await authClient.put(`/users/${userId}`, {
      name,
      email
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Change password
export const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await authClient.post(
      `/users/${userId}/change-password`,
      {},
      {
        params: { oldPassword, newPassword },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};
