export const ROUTE_CONFIG = [
  { path: "/", layout: "main",  },
  { path: "/login", layout: "auth" },
  { path: "/register", layout: "auth" },
  { path: "/products", layout: "main" , protected: true},
  { path: "/products/:id", layout: "main" },
  { path: "/category/:id", layout: "main" },
  { path: "/profile", layout: "main", protected: true },
  { path: "/admin", layout: "auth", protected: true, role: "admin" },
  { path: "/about", layout: "main" },
  { path: "/contact", layout: "main" },
  { path: "*", layout: "auth" },
];
