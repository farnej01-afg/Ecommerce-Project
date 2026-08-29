import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  matchPath,
  Link,
} from "react-router-dom";
import { useEffect } from "react";

import useAuthStore from "./features/auth/authStore";
import ScrollToTop from "./utils/scrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/productDetails";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { ROUTE_CONFIG } from "./config/layoutConfig";
import { ToastContainer } from "react-toastify";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CategoryProducts from "./pages/CategoryProducts";
import useThemeStore from "./features/theme/themeStore";
import Dashboard from "./pages/admin/Dashboard";
import useCurrentRole from "./hooks/useCurrentRole";
import AdminLayout from "./components/admin/adminLayout";
import OrderStatus from "./pages/OrderStatus";
import Checkout from "./pages/Checkout";
import ProductsPage from "./pages/admin/pages/productsPage";
import CategoriesPage from "./pages/admin/pages/categoriesPage";
import FavoritesPage from "./pages/Favorites";
function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" replace />;
}

function SecretRoute({ children }) {
  const { data } = useCurrentRole();
  if (data?.user?.role === "admin") return children;
  return (
    <div className="w-full h-100vh flex items-center justify-center">
      <h1 className="text-red-500 font-semibold">Access Denied</h1>
      <br />
      <Link to="/">Back to shop</Link>
    </div>
  );
}

function LayoutWrapper({ children }) {
  const location = useLocation();
  const route = ROUTE_CONFIG.find((r) =>
    matchPath({ path: r.path, end: true }, location.pathname),
  );

  const layout = route?.layout;
  const showHeader = layout == "main" || layout == "admin";
  const showFooter = layout == "main";

  return (
    <>
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}
    </>
  );
}

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      useAuthStore.setState({ token });
    }
  }, []);

  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <ScrollToTop />
        <LayoutWrapper className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Shop />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/category/:id" element={<CategoryProducts />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<FavoritesPage/>}/>

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderStatus />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <SecretRoute>
                  <AdminLayout />
                </SecretRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route
                path="orders"
                element={<div>Orders page coming soon</div>}
              />
              <Route path="users" element={<div>Users page coming soon</div>} />
              <Route path="inbox" element={<div>Inbox page coming soon</div>} />
              s{/* add more routes here */}
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </>
  );
}
