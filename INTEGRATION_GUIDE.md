# Frontend & Backend Integration Guide

## ✅ Integration Complete!

Your React/Vite frontend is now fully integrated with the Java backend API.

---

## 📋 Configuration

### Environment Variables

The frontend uses environment variables for API configuration. These are defined in `.env.local`:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=5000
VITE_OAUTH_ENABLED=false
```

You can override these by creating `.env` files:
- `.env.local` - Local development (committed with defaults)
- `.env.production` - Production settings (not committed)

Example `.env.production`:
```bash
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_API_TIMEOUT=10000
```

---

## 🔐 Authentication Integration

### Endpoints Used

**Backend API Base**: `http://localhost:8080/api`

#### Auth Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (requires token)
- `PUT /users/{id}` - Update user profile
- `POST /users/{id}/change-password` - Change password

### How It Works

1. **Registration**
   - User fills form with name, email, password
   - Frontend sends to `POST /auth/register`
   - User is created in database

2. **Login**
   - User enters email & password
   - Frontend sends to `POST /auth/login`
   - Backend returns JWT token
   - Token stored in `localStorage` as `jwtToken`
   - Token automatically added to all future requests

3. **Token Storage**
   ```javascript
   localStorage.setItem('jwtToken', response.data.token);
   ```

4. **Auto-attach to Requests**
   ```javascript
   Authorization: Bearer <jwtToken>
   ```

### Auth Service Methods

Located in `src/services/oauthService.js`:

```javascript
// Register
await registerUser(name, email, password);

// Login
const { token, user } = await loginUser(email, password);

// Get current user
const user = await getCurrentUser(token);

// Logout
logoutUser();

// Update profile
await updateUserProfile(userId, name, email);

// Change password
await changePassword(userId, oldPassword, newPassword);
```

---

## 📦 Product Integration

### Product Endpoints

- `GET /products` - Get all products (paginated)
- `GET /products/{id}` - Get product by ID
- `GET /products/category/{categoryId}` - Get products by category
- `GET /categories` - Get all categories
- `GET /products/search?query={query}` - Search products

### Product Service

Located in `src/services/productService.js`:

```javascript
// Fetch all products
const products = await fetchProducts(page, size);

// Fetch by ID
const product = await fetchProductById(id);

// Fetch by category
const products = await fetchProductsByCategory(categoryId, page, size);

// Fetch categories
const categories = await fetchCategories();

// Search
const results = await searchProducts(query, page, size);
```

---

## 🛒 Shopping Cart Integration

### Cart Endpoints

- `GET /cart` - Get user's cart
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/{itemId}` - Update item quantity
- `DELETE /cart/items/{itemId}` - Remove item
- `DELETE /cart` - Clear cart

### Cart Service

Located in `src/services/cartService.js`:

```javascript
// Get cart
const cart = await getCart();

// Add to cart
await addToCart(productId, quantity);

// Update item
await updateCartItem(itemId, quantity);

// Remove item
await removeFromCart(itemId);

// Clear cart
await clearCart();
```

---

## ❤️ Wishlist Integration

### Wishlist Endpoints

- `GET /wishlist` - Get user's wishlist
- `POST /wishlist/items` - Add item to wishlist
- `DELETE /wishlist/items/{itemId}` - Remove item
- `GET /wishlist/check/{productId}` - Check if product in wishlist
- `DELETE /wishlist` - Clear wishlist

### Wishlist Service

Located in `src/services/wishlistService.js`:

```javascript
// Get wishlist
const wishlist = await getWishlist();

// Add to wishlist
await addToWishlist(productId);

// Remove from wishlist
await removeFromWishlist(itemId);

// Check if in wishlist
const isInWishlist = await isInWishlist(productId);

// Clear wishlist
await clearWishlist();
```

---

## 📦 Orders Integration

### Order Endpoints

- `POST /orders` - Create order
- `GET /orders` - Get user's orders (paginated)
- `GET /orders/{orderId}` - Get order details
- `PUT /orders/{orderId}/cancel` - Cancel order
- `GET /orders/{orderId}/status` - Get order status

### Order Service

Located in `src/services/orderService.js`:

```javascript
// Create order
const order = await createOrder(orderData);

// Get orders
const orders = await getUserOrders(page, size);

// Get order details
const order = await getOrderById(orderId);

// Cancel order
await cancelOrder(orderId);

// Get status
const status = await getOrderStatus(orderId);
```

---

## 🚀 Starting the Integration

### Step 1: Start the Backend

```bash
cd /home/user/e-commerce
./START.sh
# or
mvn spring-boot:run
```

Backend will run on: `http://localhost:8080`

### Step 2: Start the Frontend

```bash
cd /home/user/e-com_frontend
npm run dev
```

Frontend will run on: `http://localhost:5173`

### Step 3: Test Integration

1. **Test Authentication**
   - Go to login page
   - Try registering a new account
   - Try logging in
   - Check localStorage for `jwtToken`

2. **Test Products**
   - Home page should load products from backend
   - Filter by category should work
   - Search functionality should work

3. **Test Cart**
   - Add items to cart
   - Refresh page - cart persists
   - Update quantities
   - Cart total calculates correctly

4. **Test Wishlist**
   - Add items to wishlist
   - Items persist after refresh
   - Remove items works

---

## 🔌 API Request Flow

### Example: Login Request

```javascript
// Frontend - LoginPage.jsx
const result = await login(email, password);

// → Calls oauthService.js
const response = await authClient.post('/auth/login', {
  email,
  password
});

// → HTTP Request to Backend
POST http://localhost:8080/api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// → Backend processes request
// → Returns JWT token + user info
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}

// → Frontend stores token
localStorage.setItem('jwtToken', token);

// → All future requests include token
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│              React/Vite Frontend                    │
│              (http://localhost:5173)                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Pages:                  Services:                 │
│  - HomePage              - productService.js       │
│  - CartPage              - authService.js          │
│  - WishlistPage          - cartService.js          │
│  - LoginPage             - wishlistService.js      │
│  - AccountPage           - orderService.js         │
│                                                     │
│  State (Zustand):                                  │
│  - authStore             - cartStore               │
│  - wishlistStore                                   │
│                                                     │
└──────────────┬──────────────────────────────────────┘
               │ HTTP/CORS
               │ axios
               │
┌──────────────▼──────────────────────────────────────┐
│          Java Spring Boot Backend                   │
│          (http://localhost:8080/api)                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Controllers:            Services:                 │
│  - AuthController        - AuthService             │
│  - ProductController     - ProductService          │
│  - CartController        - CartService             │
│  - WishlistController    - WishlistService         │
│  - OrderController       - OrderService            │
│  - UserController        - UserService             │
│                                                     │
│  Security:                                         │
│  - JWT Authentication                              │
│  - CORS Configuration                              │
│                                                     │
│  Database: MySQL                                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Troubleshooting

### CORS Errors

If you see CORS errors:

1. **Check backend CORS configuration**
   - Backend should have CORS enabled for `http://localhost:5173`
   - Typically in `application.properties` or WebConfig class

2. **Verify API URL**
   - Check `.env.local` has correct `VITE_API_BASE_URL`
   - Should match backend URL (usually `http://localhost:8080/api`)

3. **Test with curl**
   ```bash
   curl http://localhost:8080/api/products
   ```

### Authentication Issues

1. **Token not persisting**
   - Check if `jwtToken` is in localStorage
   - Browser DevTools → Application → Storage → localStorage

2. **Token expired**
   - Clear localStorage and login again
   - Check backend token expiration settings

3. **401 Unauthorized**
   - Token not being sent
   - Token format incorrect
   - Token expired

### Product Data Not Loading

1. **Check backend is running**
   ```bash
   curl http://localhost:8080/api/products
   ```

2. **Check API response format**
   - May need to adjust HomePage.jsx filters
   - Backend returns paginated data

3. **Check browser console for errors**
   - Network tab in DevTools

---

## 📚 API Documentation

For complete API documentation, visit:

**Backend Swagger UI**: `http://localhost:8080/swagger-ui.html`

This shows all endpoints, parameters, and response formats.

---

## ✨ Next Steps

1. **Deploy to Production**
   - Update `.env.production` with production API URL
   - Build frontend: `npm run build`
   - Deploy to hosting (Vercel, Netlify, etc.)

2. **Add More Features**
   - Product reviews
   - Order tracking
   - Payment integration
   - Email notifications

3. **Optimize Performance**
   - Add caching
   - Implement pagination
   - Optimize images

4. **Security Improvements**
   - Implement refresh tokens
   - Add rate limiting
   - Set up HTTPS

---

## 📞 Support

- Backend Issues: Check `/home/user/e-commerce/README.md`
- Frontend Issues: Check `/home/user/e-com_frontend/README.md`
- Integration Issues: Check this document

**Happy Coding! 🎉**
