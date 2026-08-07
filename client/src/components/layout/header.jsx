import { useState } from "react";
import { ShoppingCart, Menu, X, Settings, Search } from "lucide-react";
import TTip from "../ui/tooltip";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import useCartStore from "@/features/cart/cartStore";
import SettingsMenu from "./settingsMenu";

function Header() {
  const [activeTab, setActiveTab] = useState("new-in");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "HOME", link: "/" },
    { id: "store", label: "STORE", link: "/products" },
    { id: "about", label: "ABOUT", link: "/about" },
    { id: "contact", label: "CONTACT", link: "/contact" },
  ];

  return (
    <div>
      <header className="hidden md:flex fixed top-0 inset-x-0 z-50 justify-center pt-5 px-4 md:px-6 pointer-events-none animate__animated animate__bounceInDown">
        <div className="w-full max-w-7xl flex items-center justify-between gap-3 lg:gap-6">
          {/* Logo */}
          <Link to="/" className="pointer-events-auto shrink-0 flex items-center">
            <img src="Logo.png" className="h-8 lg:h-9 w-auto" alt="Logo" />
          </Link>

          {/* Navigation */}
          <nav className="pointer-events-auto flex items-center gap-5 lg:gap-10 bg-zinc-500/30 backdrop-blur-xl px-4 lg:px-5 py-2.5 rounded-full border border-white/10 shadow-lg shadow-black/20 ml-25">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <Link
                  onClick={() => setActiveTab(item.id)}
                  to={item.link}
                  className={`text-[11px] lg:text-xs font-medium tracking-wide transition-colors pb-0.5 list-none cursor-pointer whitespace-nowrap ${
                    activeTab === item.id
                      ? "text-white"
                      : "text-zinc-400 border-transparent hover:text-gray-200"
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && <span className="ml-1">▼</span>}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="pointer-events-auto flex items-center gap-4 lg:gap-5 bg-zinc-500/30 backdrop-blur-xl text-xs px-4 py-2.5 rounded-full border border-white/10 shadow-lg shadow-black/20 shrink-0">
            <button className="text-zinc-400 hover:text-white transition-colors flex items-center">
              <TTip text="Search an Item" position="bottom">
                <Search size={15} strokeWidth={1.5} className="cursor-pointer" />
              </TTip>
            </button>

            {/* Settings TRIGGER only — no SettingsMenu nested here anymore */}
            <button
              onClick={() => setSettingsOpen((prev) => !prev)}
              className="text-zinc-400 hover:text-white transition-colors flex items-center"
            >
              <TTip text="Settings" position="bottom">
                <Settings size={15} strokeWidth={1.5} className="cursor-pointer" />
              </TTip>
            </button>

            <button
              className="relative text-zinc-400 hover:text-white transition-colors flex items-center"
              onClick={() => navigate("/cart")}
            >
              <TTip text="Shopping Cart" position="bottom">
                <ShoppingCart size={15} strokeWidth={1.5} className="cursor-pointer" />
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-blue-600 text-white text-[8px] rounded-full flex items-center justify-center cursor-pointer">
                  {cartItems.length}
                </span>
              </TTip>
            </button>
          </div>
        </div>
      </header>

      {/* ===================== MOBILE LOGO (top-left, below md) ===================== */}
      <div className="md:hidden fixed top-0 left-0 z-50 p-4 pointer-events-none">
        <Link to="/" className="pointer-events-auto flex items-center">
          <img src="Logo.png" className="h-8 w-auto" alt="Logo" />
        </Link>
      </div>

      {/* ===================== MOBILE BOTTOM NAV (below md) ===================== */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-zinc-950/70 backdrop-blur-xl border-t border-white/10"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Expanded overflow menu (settings / search) */}
        {mobileMenuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 space-y-1 shadow-xl shadow-black/40 animate__animated animate__fadeInUp animate__faster">
            {/* Settings TRIGGER only — no SettingsMenu nested here anymore */}
            <button
              onClick={() => setSettingsOpen((prev) => !prev)}
              className="w-full flex items-center gap-3 text-left text-xs font-medium tracking-wide text-zinc-300 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
            >
              <Settings size={16} strokeWidth={1.5} />
              SETTINGS
            </button>
            <button className="w-full flex items-center gap-3 text-left text-xs font-medium tracking-wide text-zinc-300 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
              <Search size={16} strokeWidth={1.5} />
              SEARCH
            </button>
          </div>
        )}

        <div className="flex items-center justify-around px-1 py-2.5">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-1 text-[10px] font-medium tracking-wide transition-colors ${
                activeTab === item.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <button
            className="relative flex-1 flex flex-col items-center justify-center gap-1 py-1 text-zinc-500 hover:text-zinc-300 transition-colors"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={17} strokeWidth={1.5} className="cursor-pointer" />
            <span className="absolute -top-0.5 right-[22%] w-3.5 h-3.5 bg-blue-600 text-white text-[8px] rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-1 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* ===================== SINGLE SettingsMenu instance — mounted once, positioned per breakpoint ===================== */}
      {settingsOpen && (
        <div className="fixed z-[60] bottom-24 inset-x-3 md:bottom-auto md:inset-x-auto md:top-20 md:right-10">
          <SettingsMenu
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

export default Header;