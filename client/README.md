ecommerce-mern/
├── client/                    # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── api/               # Axios instances + API calls
│   │   ├── app/               # Redux store setup
│   │   ├── components/        # Shared UI components
│   │   │   ├── ui/            # Buttons, inputs, badges…
│   │   │   ├── layout/        # Navbar, Footer, Sidebar
│   │   │   └── common/        # ProductCard, StarRating…
│   │   ├── features/          # Redux slices per domain
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   ├── products/
│   │   │   └── orders/
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Route-level page components
│   │   │   ├── Home.jsx
│   │   │   ├── ProductListing.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── ManageProducts.jsx
│   │   │       └── ManageOrders.jsx
│   │   ├── routes/            # Protected + public routes
│   │   ├── utils/             # Formatters, validators
│   │   └── main.jsx
│   ├── .env.example
│   └── vite.config.js
│
└── server/                    # Express + Node backend
    ├── config/
    │   ├── db.js              # Mongoose connection
    │   └── cloudinary.js
    ├── controllers/           # Business logic
    │   ├── authController.js
    │   ├── productController.js
    │   ├── orderController.js
    │   ├── paymentController.js
    │   └── adminController.js
    ├── middleware/
    │   ├── authMiddleware.js  # JWT verify
    │   ├── adminMiddleware.js
    │   ├── errorHandler.js
    │   └── rateLimiter.js
    ├── models/
    │   ├── User.js
    │   ├── Product.js
    │   ├── Order.js
    │   ├── Review.js
    │   └── Category.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── productRoutes.js
    │   ├── orderRoutes.js
    │   ├── paymentRoutes.js
    │   └── adminRoutes.js
    ├── utils/
    |   |__ validation.js
    │   ├── sendEmail.js
    │   ├── generateToken.js
    │   └── apiFeatures.js     # filter/sort/paginate helper
    ├── .env.example
    └── server.js