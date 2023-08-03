import { Component, ReactNode } from "react";

type PropsType = {
    children: ReactNode;
};

type StateType = {
    hasError: boolean;
}

class ErrorBoundary extends Component<PropsType> {
    constructor(props: PropsType) {
        super(props);
    }

    state: StateType = { hasError: false };

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
