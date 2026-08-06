import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import useCurrentRole from "@/hooks/useCurrentRole";

const TITLES = {
  "/admin": "Overview",
  "/admin/products": "Products",
  "/admin/categories": "Categories",
  "/admin/orders": "Orders",
  "/admin/users": "Users",
  "/admin/inbox": "Inbox",
};

export default function Topbar() {
  const location = useLocation();
  const { data } = useCurrentRole();
  const title = TITLES[location.pathname] || "Admin";

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-black/10 bg-white">
      <h2 className="text-lg font-semibold text-black">{title}</h2>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-black/5">
          <Search size={18} className="text-black/60" />
        </button>
        <button className="p-2 rounded-full hover:bg-black/5">
          <Bell size={18} className="text-black/60" />
        </button>
        <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-xs font-medium text-black">
          {data?.user?.email?.[0].toUpperCase() || "?"}
        </div>
      </div>
    </header>
  );
}
