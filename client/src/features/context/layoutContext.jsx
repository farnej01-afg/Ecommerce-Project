import { createContext, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { LAYOUT_CONFIG, ROUTE_CONFIG } from "../config/layoutConfig";

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const location = useLocation();

  const currentLayout = useMemo(() => {
    const route = ROUTE_CONFIG.find((r) => r.path === location.pathname);
    const layoutType = route?.layout || "main";
    return {
      type: layoutType,
      config: LAYOUT_CONFIG[layoutType] || LAYOUT_CONFIG.main,
      route: route || {},
    };
  }, [location.pathname]);

  return (
    <LayoutContext.Provider value={currentLayout}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
}
