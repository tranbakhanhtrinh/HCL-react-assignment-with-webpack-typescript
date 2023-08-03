import { createContext, ReactNode, useCallback, useState } from "react";
import ToastContainer from "components/Toast/ToastContainer";

export type ToastType = {
    id: number;
    value: string;
    type: string;
};

export type DefaultValue = {
    addToast: (value: string, type: string) => void;
    removeToast: (id: number) => void;
    toasts: ToastType[];
};

const defaultValue: DefaultValue = {
    addToast: () => {},
    removeToast: () => {},
    toasts: [],
};

export const ToastContext = createContext(defaultValue);

let id = 0;

const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const addToast = useCallback(
        (value: string, type: string) => {
            setToasts((toasts) => [...toasts, { id: id++, value, type }]);
        },
        [setToasts]
    );

    const removeToast = useCallback(
        (id: number) => {
            setToasts((toasts) => toasts.filter((t) => t.id !== id));
        },
        [setToasts]
    );

    return (
        <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
            {children}
            <ToastContainer toasts={toasts} />
        </ToastContext.Provider>
    );
};

export default ToastProvider;
