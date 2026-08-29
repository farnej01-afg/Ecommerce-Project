const STORAGE_KEY = "guestFavoriteIds";

export function getGuestFavoriteIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setGuestFavoriteIds(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}
