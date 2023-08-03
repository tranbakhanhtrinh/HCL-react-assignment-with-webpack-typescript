import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

describe("This is the Navbar", () => {
    render(<Navbar />, { wrapper: BrowserRouter });
    it("should render the Navbar", () => {
        expect(screen.getByTestId(/navbar/i)).toBeInTheDocument();
        expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
        expect(screen.getByText(/products/i)).toBeInTheDocument();
        expect(screen.getByText(/create a new product/i)).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/')
        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByText('Create a new product').closest('a')).toHaveAttribute('href', '/create')
    });
});
