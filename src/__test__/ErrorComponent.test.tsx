import { render, screen } from "@testing-library/react"
import ErrorComponent from "../common/ErrorComponent/ErrorComponent"

describe("Error Component", () => {
    it("should render if getting the error message", () => {
        render(<ErrorComponent message="Something went wrong"/>)
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    })
})