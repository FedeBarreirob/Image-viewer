import { create } from "zustand";
import { IImage } from "../interfaces/image.interface";

interface FavoritesState {
    favorites: IImage[];
    addFavorite: (image: IImage) => void;
    removeFavorite: (imageId: string) => void;
    isFavorite: (imageId: string) => boolean;
    restoreFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
    favorites: [],
    addFavorite: (image: IImage) => {
        set((state) => {
            const updatedFavorites = [...state.favorites, image];
            window.localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return { favorites: updatedFavorites };
        });
    },
    removeFavorite: (imageId: string) => {
        set((state) => {
            const updatedFavorites = state.favorites.filter((fav) => fav.id !== imageId);
            window.localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return { favorites: updatedFavorites };
        });
    },
    isFavorite: (imageId: string) => {
        const state = get();
        return state.favorites.some((fav) => fav.id === imageId);
    },
    restoreFavorites: () => {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            set({ favorites: JSON.parse(savedFavorites) });
        }
    },
}));

export default useFavoritesStore;
