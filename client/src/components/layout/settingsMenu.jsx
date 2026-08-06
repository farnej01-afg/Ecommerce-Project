import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { User, LogIn, Moon, Sun, ShieldCheck } from "lucide-react";
import useAuthStore from "@/features/auth/authStore";
import useThemeStore from "@/features/theme/themeStore";
import useCurrentRole from "@/hooks/useCurrentRole";

export default function SettingsMenu({ open, onClose }) {
  const token = useAuthStore((state) => state.token);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const menuRef = useRef(null);
  const { data } = useCurrentRole();

  // close when clicking outside the popup
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="
        absolute right-0 top-full mt-3 w-56 z-50
        rounded-3xl border border-white/15 bg-white/8 backdrop-blur-xl
        shadow-[0_20px_50px_rgba(0,0,0,0.55)]
        overflow-hidden
      "
    >
      <div className="p-2">
        {token ? (
          <Link
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <User size={16} strokeWidth={1.5} />
            Account
          </Link>
        ) : (
          <Link
            to="/login"
            onClick={onClose}
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogIn size={16} strokeWidth={1.5} />
            Sign in / Sign up
          </Link>
        )}

        <div className="my-1 h-px bg-white/10" />

        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          {theme === "dark" ? (
            <Sun size={16} strokeWidth={1.5} />
          ) : (
            <Moon size={16} strokeWidth={1.5} />
          )}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>

        {data?.user?.role === "admin" && (
          <>
            <div className="my-1 h-px bg-white/10" />
            <Link
              to="/admin"
              onClick={onClose}
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ShieldCheck size={16} strokeWidth={1.5}/>
              Admin Panel
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
