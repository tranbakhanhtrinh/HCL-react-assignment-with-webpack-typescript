import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { renderWithProviders } from "./utils/test-utils";

// const store = setupTestStore();

jest.mock("./helpers/axios");

const TestComponent = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

afterAll(cleanup);

describe("This is the home page", () => {
    it("should render the heart loading", async () => {
        renderWithProviders(<TestComponent />);
        expect(screen.getByTestId(/heart-loading/i)).toBeInTheDocument();
    });
});
