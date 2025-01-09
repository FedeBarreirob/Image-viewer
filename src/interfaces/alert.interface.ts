import { AlertColor } from "../hooks/useAlert";

export interface IAlert {
    open: boolean,
    text: string,
    color: AlertColor,
}