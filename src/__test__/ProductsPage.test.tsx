/* eslint-disable testing-library/no-node-access */
import { cleanup, screen, waitFor } from "@testing-library/react";
import ProductsPage from "../pages/Products/Products";
import { act } from "react-dom/test-utils";
import { api } from "../helpers/axios";
import { renderWithProviders } from "../utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// const mockDispatch = jest.fn();
jest.mock("../helpers/axios");
// jest.mock("react-redux", () => {
//     return {
//         ...jest.requireActual("react-redux"),
//         useSelector: jest.fn().mockImplementation(() => ({})),
//         useDispatch: () => mockDispatch,
//     };
// });
const mockedApi = api as jest.Mocked<typeof api>;
const mockApiData = {
    data: {
        products: [
            {
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
            {
                id: 2,
                title: "iPhone X",
                description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
                price: 899,
                discountPercentage: 17.94,
                rating: 4.44,
                stock: 34,
                brand: "Apple",
                category: "smartphones",
                thumbnail: "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
                images: ["https://dummyjson.com/image/i/products/2/1.jpg", "https://dummyjson.com/image/i/products/2/2.jpg", "https://dummyjson.com/image/i/products/2/3.jpg", "https://dummyjson.com/image/i/products/2/thumbnail.jpg"],
            },
        ],
    },
};

const mockError = { message: "Request failed with status code 404" };

afterAll(cleanup);
const renderTestComp = () =>
    renderWithProviders(
        <BrowserRouter>
            <ProductsPage />
        </BrowserRouter>
    );

describe("Render the initial Products page", () => {
    it("should render the products section and loading to wait for the api response", async () => {
        renderTestComp();
        expect(screen.getByTestId(/home-product/i)).toBeInTheDocument();
        expect(screen.getByText(/products/i)).toBeInTheDocument();
        expect(screen.getByTestId(/heart-loading/i)).toBeInTheDocument();
    });
    it("should call api once", async () => {
        mockedApi.get.mockResolvedValueOnce(mockApiData);
        renderTestComp();
        await act(async () => {
            await Promise.resolve();
        });
        expect(screen.queryByTestId(/heart-loading/i)).not.toBeInTheDocument();
        expect(api.get).toHaveBeenCalledTimes(1);
        // screen.debug();
        expect(screen.getByText("iPhone 9").closest("h4")).toBeInTheDocument();
    });
    it("should redirect to edit component", async () => {
        mockedApi.get.mockResolvedValueOnce(mockApiData);
        renderTestComp();
        await act(async () => {
            await Promise.resolve();
        });
        await userEvent.click(screen.getAllByTestId(/edit-icon/)[0]);
        expect(window.location.href).toBe(window.location.origin + "/edit/product/1");
    });
    it("should display the Modal and the toast when click delete icon", async () => {
        mockedApi.get.mockResolvedValueOnce(mockApiData);
        renderTestComp();
        await act(async () => {
            await Promise.resolve();
        });
        const deleteBtn = screen.getAllByTestId(/delete-icon/i)[1];
        await userEvent.click(deleteBtn);
        expect(screen.getByTestId(/modal-testid/i)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId(/modal-btn-ok/i));
        mockedApi.delete.mockResolvedValue({});
        await act(async () => {
            await Promise.resolve();
        });
        expect(screen.queryByText("iPhone X")).not.toBeInTheDocument();
    });
    it("should have error message if there is a wrong api url", async () => {
        mockedApi.get.mockRejectedValueOnce(mockError);
        renderTestComp();
        await act(async () => {
            await Promise.resolve();
        });
        expect(screen.queryByTestId(/heart-loading/i)).not.toBeInTheDocument();
        expect(api.get).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId(/error-box/i)).toBeInTheDocument();
    });
});
