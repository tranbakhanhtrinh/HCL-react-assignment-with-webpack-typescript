import React from "react";

interface Props {
    message: string;
}

const ErrorComponent: React.FC<Props> = ({ message }) => (
    <div data-testid="error-box" className="alert alert-danger" role="alert">
        {message}
    </div>
);

export default ErrorComponent;
