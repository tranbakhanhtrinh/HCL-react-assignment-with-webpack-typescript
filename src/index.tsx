import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import ToastProvider from "./contexts/ToastContext";
import ErrorBoundary from "./errorBoundary/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ErrorBoundary>
                    <ToastProvider>
                        <App />
                    </ToastProvider>
                </ErrorBoundary>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);