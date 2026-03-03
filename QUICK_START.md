# Quick Start Guide - Frontend & Backend Integration

## 🚀 Start Both Applications

### Terminal 1: Start Backend (Java)
```bash
cd /home/user/e-commerce
./START.sh
```
Wait for: `Started ECommerceApplication in ...`
Backend URL: `http://localhost:8080`

### Terminal 2: Start Frontend (React)
```bash
cd /home/user/e-com_frontend
npm run dev
```
Frontend URL: `http://localhost:5173`

---

## ✅ Verify Integration Works

### 1. Check Backend API
```bash
curl http://localhost:8080/api/products
```
Should return JSON array of products

### 2. Open Frontend
Visit: `http://localhost:5173`

### 3. Test Login
- Click "Sign In" or "Sign Up"
- Create a new account
- Login with your credentials
- Check browser DevTools → Application → localStorage → `jwtToken`

### 4. Test Home Page
- Products should load from backend
- Try filtering by category
- Search for products

### 5. Test Cart
- Add item to cart
- Go to cart page
- Update quantity
- Refresh page - cart persists

### 6. Test Wishlist
- Click heart icon on products
- Go to Wishlist page
- Add from wishlist to cart

---

## 📁 Project Structure

```
/home/user/
├── e-com_frontend/          ← React Frontend
│   ├── .env.local           (Config)
│   ├── src/services/        (API Services)
│   └── package.json
│
└── e-commerce/              ← Java Backend
    ├── src/
    ├── pom.xml
    └── START.sh
```

---

## 🔧 Configuration

### Frontend API URL
**File:** `/home/user/e-com_frontend/.env.local`
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### Backend CORS
Backend is configured to accept requests from `http://localhost:5173`

---

## 📞 Common Commands

### Frontend
```bash
cd /home/user/e-com_frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Check for errors
npm run lint
```

### Backend
```bash
cd /home/user/e-commerce

# Start application
./START.sh

# Or with Maven
mvn spring-boot:run

# View Swagger API docs
# Open: http://localhost:8080/swagger-ui.html
```

---

## 🔍 Debugging

### Check if Backend is Running
```bash
curl http://localhost:8080/api/products
```

### Check if Frontend is Running
```bash
curl http://localhost:5173
```

### View Frontend Logs
DevTools → Console (F12)

### View Backend Logs
Terminal where you started backend with `./START.sh`

### Check API Requests
DevTools → Network → Click on API calls

### Check Stored Token
DevTools → Application → Storage → localStorage → Look for `jwtToken`

---

## 🔑 Test Credentials

You can create your own account, or test with:
```
Email: test@example.com
Password: Test@123
```

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS Error | Backend not running on 8080 |
| 401 Unauthorized | Need to login first |
| Products not loading | Check backend is running, check `/api/products` |
| Cart not saving | Check localStorage, browser console |
| Logout doesn't work | Check localStorage is being cleared |

---

## 📊 API Endpoints Reference

### Auth
- `POST /auth/register` - Create account
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user

### Products
- `GET /products` - All products
- `GET /products/{id}` - Single product
- `GET /categories` - All categories
- `GET /products/category/{id}` - By category

### Cart (Requires Auth)
- `GET /cart` - View cart
- `POST /cart/items` - Add item
- `PUT /cart/items/{id}` - Update quantity
- `DELETE /cart/items/{id}` - Remove item

### Wishlist (Requires Auth)
- `GET /wishlist` - View wishlist
- `POST /wishlist/items` - Add item
- `DELETE /wishlist/items/{id}` - Remove item

### Orders (Requires Auth)
- `POST /orders` - Create order
- `GET /orders` - View orders
- `GET /orders/{id}` - Order details

---

## 📚 Documentation

- **INTEGRATION_COMPLETE.md** - Full integration details
- **INTEGRATION_GUIDE.md** - API reference & troubleshooting
- **README.md** - Frontend overview
- Backend docs: `/home/user/e-commerce/README.md`

---

## ✨ Features Available

✅ User Registration & Login (JWT)
✅ Browse Products (from database)
✅ Filter by Category
✅ Search Products
✅ Add to Cart (synced with backend)
✅ Manage Cart (update qty, remove)
✅ Wishlist Management
✅ User Profile View
✅ Order Management
✅ Responsive Design
✅ Error Handling

---

## 🎯 What's Next?

After verifying integration works:

1. **Add More Pages**
   - Product detail page
   - Checkout page
   - Order history page

2. **Add Features**
   - Payment integration
   - Product reviews
   - User ratings
   - Admin dashboard

3. **Deploy**
   - Build frontend: `npm run build`
   - Deploy dist/ to hosting
   - Update .env.production with production API

---

**Happy coding! 🎉**

Questions? Check the detailed guides:
- INTEGRATION_GUIDE.md
- Backend README at /home/user/e-commerce/README.md
