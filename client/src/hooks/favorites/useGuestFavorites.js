import { useState, useCallback } from "react";
import {
  getGuestFavoriteIds,
  setGuestFavoriteIds,
} from "@/utils/guestFavorites";
import { useProducts } from "../useProducts";

export function useGuestFavorites() {
  const [favoritesIds, setFavoritesIds] = useState(getGuestFavoriteIds);
  const { data: allProducts, isLoading } = useProducts();

  const favorites = (allProducts || []).filter((p) =>
    favoritesIds.includes(p._id),
  );

  const addFavorites = useCallback((productId) => {
    setFavoritesIds((prev) => {
      if (prev.includes(productId)) return prev;
      const updated = [...prev, productId];
      setGuestFavoriteIds(updated);
      return updated;
    });
  }, []);

  const removeFavorites = useCallback((productId) => {
    setFavoritesIds((prev) => {
      const updated = prev.filter((id) => id !== productId);
      setGuestFavoriteIds(updated);
      return updated;
    });
  }, []);
  return { favorites, isLoading, addFavorites, removeFavorites };
}
