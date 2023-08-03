import { screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import Product from "../pages/Product/Product";
import { api } from "../helpers/axios";
import { act } from "react-dom/test-utils";
import { renderWithProviders } from "../utils/test-utils";

jest.mock("../helpers/axios");

jest.mock("react-router-dom", () => ({ ...jest.requireActual("react-router-dom"), useParams: jest.fn() }));
const mockedApi = api as jest.Mocked<typeof api>
const mockedParams = useParams as jest.MockedFunction<typeof useParams>
const mockApiData = {
    data: {
        id: 1,
        title: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: "Apple",
        category: "smartphones",
        thumbnail: "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
        images: ["https://dummyjson.com/image/i/products/1/1.jpg", "https://dummyjson.com/image/i/products/1/2.jpg", "https://dummyjson.com/image/i/products/1/3.jpg", "https://dummyjson.com/image/i/products/1/4.jpg", "https://dummyjson.com/image/i/products/1/thumbnail.jpg"],
    },
};
describe("This is a product detail page", () => {
    it("should render product detail", async () => {
        mockedApi.get.mockResolvedValue(mockApiData);
        mockedParams.mockReturnValue({ id: "1" });
        renderWithProviders(<Product />);
        expect(screen.getByTestId(/thumbnail/i)).toBeInTheDocument();
        await act(async () => {
            await Promise.resolve();
        });
        expect(screen.getByText(/price/i)).toBeInTheDocument();
        expect(screen.getByText(/rating/i)).toBeInTheDocument();
        expect(screen.getByAltText(/iPhone 9/i)).toBeInTheDocument();
    });
});
