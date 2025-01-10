import { create } from "zustand";

export type AlertColor =
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "sky"
  | "green"
  | undefined;

export interface IAlert {
  open: boolean;
  text: string;
  color: AlertColor;
}

interface AlertState {
  alert: IAlert | null;
  openAlert: (text: string, color: AlertColor) => void;
}

const useAlertStore = create<AlertState>((set) => ({
  alert: {
    open: false,
    text: "",
    color: "red",
  },
  openAlert: (text, color) => {
    set({
        alert: null
    })
    set({
      alert: {
        open: true,
        text,
        color,
      },
    });
    setTimeout(() => {
      set({
        alert: {
          open: false,
          text: "",
          color,
        },
      });
    }, 3000);
  },
}));

export default useAlertStore;
