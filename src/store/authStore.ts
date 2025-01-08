import { create } from "zustand";
import { IUser } from "../interfaces/user.interface";

interface UserState {
    user: IUser | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;
    restoreUser: () => IUser | null;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => {
        set({ user })
        localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser: () => {
        set({ user: null })
        localStorage.removeItem("user");
    },
    restoreUser: () => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const user = JSON.parse(savedUser);
            set({ user });
        }
        return null;
    }
}));


