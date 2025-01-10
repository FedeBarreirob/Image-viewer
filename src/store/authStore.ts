import { create } from "zustand";
import { IUser } from "../interfaces/user.interface";

interface UserState {
    user: IUser | null;
    isRestoring: boolean;
    setUser: (user: IUser) => void;
    clearUser: () => void;
    restoreUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isRestoring: true,
    setUser: (user) => {
        set({ user });
        localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser: () => {
        set({ user: null });
        localStorage.removeItem("user");
    },
    restoreUser: async () => {
        set({ isRestoring: true });
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const user: IUser = JSON.parse(savedUser);
            set({ user });
        }
        set({ isRestoring: false });
    }
}));

export default useUserStore;
