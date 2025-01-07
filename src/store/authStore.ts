import { create } from "zustand";
import { IUser } from "../interfaces/user.interface";

interface UserState {
    user: IUser | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));


