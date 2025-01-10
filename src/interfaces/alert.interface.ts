import { AlertColor } from "../store/alertStore";


export interface IAlert {
    open: boolean,
    text: string,
    color: AlertColor,
}