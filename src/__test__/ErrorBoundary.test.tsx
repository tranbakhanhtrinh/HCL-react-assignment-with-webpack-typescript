import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const renderProviders = (ui: JSX.Element) => render(ui, {});

const Child = () => {
    throw new Error();
};

describe("Error Boundary", () => {
    it(`should render error boundary component when there is an error`, () => {
        renderProviders(
            <ErrorBoundary>
                <Child />
            </ErrorBoundary>
        );
        const errorMessage = screen.getByText(/something went wrong./i);
        expect(errorMessage).toBeDefined();
    });
});
