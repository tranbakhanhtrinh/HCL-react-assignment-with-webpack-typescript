import { render, screen } from "@testing-library/react";
import NotFound from "../pages/NotFound/NotFound";

describe("Not Found page", () =>{
    it("should render Page not found", () =>{
        render(<NotFound />)
        expect(screen.getByText("Page Not Found")).toBeInTheDocument()
    })
})