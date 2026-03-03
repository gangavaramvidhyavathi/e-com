# EcomHub - E-Commerce Frontend

A modern, fully-featured e-commerce frontend application built with React, Vite, and featuring OAuth authentication, product catalog, shopping cart, wishlist, and user account management.

## Features

✨ **Key Features:**
- 🛍️ **Product Catalog** - Browse products with category filtering
- 🛒 **Shopping Cart** - Add/remove items, manage quantities, real-time total calculation
- ❤️ **Wishlist** - Save favorite items for later
- 👤 **OAuth Authentication** - Secure user login with OAuth integration
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Beautiful color scheme with smooth animations and transitions
- 💾 **Persistent Storage** - Uses localStorage to save cart and wishlist

## Technology Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **State Management:** Zustand
- **Icons:** React Icons (AiOutline)
- **HTTP Client:** Axios
- **Styling:** CSS3 with CSS Variables
- **API:** FakeStore API (for demo)

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

## Project Structure

```
src/
├── components/
│   └── Header.jsx           # Navigation header with icons
├── pages/
│   ├── HomePage.jsx         # Product listing with filters
│   ├── CartPage.jsx         # Shopping cart management
│   ├── WishlistPage.jsx     # Wishlist display
│   ├── LoginPage.jsx        # OAuth login page
│   └── AccountPage.jsx      # User account management
├── services/
│   ├── oauthService.js      # OAuth integration
│   └── productService.js    # Product API calls
├── store/
│   ├── authStore.js         # Auth state (Zustand)
│   ├── cartStore.js         # Cart state (Zustand)
│   └── wishlistStore.js     # Wishlist state (Zustand)
├── styles/
│   ├── App.css             # Global styles and CSS variables
│   ├── Header.css          # Header component styles
│   ├── ProductCard.css     # Product card styles
│   ├── HomePage.css        # Home page styles
│   ├── CartPage.css        # Cart page styles
│   ├── WishlistPage.css    # Wishlist page styles
│   ├── LoginPage.css       # Login page styles
│   └── AccountPage.css     # Account page styles
├── App.jsx                  # Main app component with routing
└── main.jsx                 # Entry point
```

## Available Scripts

### Development
```bash
npm run dev
```
Runs the app in development mode.

### Build
```bash
npm run build
```
Creates an optimized production build.

### Preview
```bash
npm run preview
```
Previews the production build locally.

### Lint
```bash
npm run lint
```
Runs ESLint to check code quality.

## Color Scheme

The app uses a modern color palette with CSS variables:

- **Primary:** #6366f1 (Indigo)
- **Secondary:** #ec4899 (Pink)
- **Accent:** #f59e0b (Amber)
- **Success:** #10b981 (Green)
- **Danger:** #ef4444 (Red)

All colors can be customized in `src/styles/App.css` under `:root` CSS variables.

## Features in Detail

### 🏠 Home Page
- Browse all products from the FakeStore API
- Filter products by category
- Quick view of product details and prices
- Add to cart or wishlist from product cards

### 🛒 Cart Page
- View all items in cart with images and prices
- Adjust quantities with increment/decrement buttons
- Remove items from cart
- Real-time calculation of subtotal, tax, and total
- Clear cart option

### ❤️ Wishlist Page
- View all saved wishlist items
- Add items to cart directly from wishlist
- Remove items from wishlist
- See product ratings and prices

### 👤 Account Page
- View user profile information
- Display user avatar
- Quick links to account features
- Profile information section with user details

### 🔐 Login Page
- Email/password form input
- OAuth login button (integrated for Google)
- Benefits section explaining login advantages
- Mock authentication for demo purposes

## OAuth Integration

The app includes OAuth integration ready to connect with Google, GitHub, or other OAuth providers. Currently uses mock authentication for demo purposes.

To integrate with a real OAuth provider:

1. Update OAuth credentials in `src/services/oauthService.js`
2. Configure redirect URI and client ID
3. Implement backend OAuth callback handler
4. Replace mock login with actual OAuth flow

## State Management

Uses Zustand for lightweight state management:

- **authStore.js** - Authentication state and user info
- **cartStore.js** - Shopping cart items and operations
- **wishlistStore.js** - Wishlist items and operations

All stores automatically persist to localStorage.

## Responsive Design

The application is fully responsive with breakpoints at:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

## API Integration

Currently uses [FakeStore API](https://fakestoreapi.com) for product data.

## License

MIT License - feel free to use this project for personal or commercial purposes.
