export interface IAlertDialog {
    open: boolean;
    title: string;
    message: string;
    handleClose?: () => void;
}