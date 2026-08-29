import useAuthStore from "@/features/auth/authStore";
import { useGuestFavorites } from "./useGuestFavorites";
import {
  useServerFavorites,
  useAddToFavorites,
  useRemoveFavorites,
} from "./useFavoritesApi";

export function useFavorites() {
  const token = useAuthStore((state) => state.token);
  const guest = useGuestFavorites();

  const { data: serverFavorites, isLoading: serverLoading } =
    useServerFavorites();
  const { mutate: addServer } = useAddToFavorites();
  const { mutate: removeServer } = useRemoveFavorites();

  if (token) {
    return {
      favorites: serverFavorites || [],
      isLoading: serverLoading,
      addFavorites: addServer,
      removeFavorites: removeServer,
    };
  }

  return {
    favorites: guest.favorites,
    isLoading: guest.isLoading,
    addFavorites: guest.addFavorites,
    removeFavorites: guest.removeFavorites,
  };
}
