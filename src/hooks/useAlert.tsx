import { useState } from "react";
import { IAlert } from "../interfaces/alert.interface";

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

const useAlert = () => {
  const [alert, setAlert] = useState({
    open: false,
    text: "",
    color: "red" as AlertColor,
  } as IAlert);

  const openAlert = (text: string, color: AlertColor) => {
    setAlert({
      open: true,
      text: text,
      color: color,
    });

    setTimeout(() => {
      setAlert({
        open: false,
        text: "",
        color: color,
      });
    }, 3000);
  };

  return { openAlert, alert };
};

export default useAlert;
