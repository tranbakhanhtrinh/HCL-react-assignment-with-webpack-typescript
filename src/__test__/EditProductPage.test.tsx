import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { BrowserRouter, useParams } from "react-router-dom";
import { formConfig } from "../constants/formConfig";
import ToastProvider from "../contexts/ToastContext";
import { api } from "../helpers/axios";
import EditProduct from "../pages/EditProduct/EditProduct";
import { renderWithProviders } from "../utils/test-utils";

jest.mock("../helpers/axios");

jest.mock("react-router-dom", () => ({ ...jest.requireActual("react-router-dom"), useParams: jest.fn() }));
const mockedApi = api as jest.Mocked<typeof api>;
const mockedParams = useParams as jest.MockedFunction<typeof useParams>;
const FormTest = () => (
    <BrowserRouter>
        <ToastProvider>
            <EditProduct />
        </ToastProvider>
    </BrowserRouter>
);

const setup = () => renderWithProviders(<FormTest />);

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

afterEach(cleanup);

describe("Edit/Add product", () => {
    beforeEach(() => {
        mockedParams.mockReturnValue({ id: "1" });
        mockedApi.get.mockResolvedValue(mockApiData);
    });
    it("should render labels", () => {
        setup();
        formConfig.forEach(({ label }) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });

    it("should display errors if submitting empty values", async () => {
        setup();
        const submitBtn = screen.getByTestId("edit-or-add");
        await userEvent.click(submitBtn);
        expect(screen.getAllByTestId(/error-message/i).length).toEqual(formConfig.length);
    });

    it("should redirect to home page if clicking Cancel button", () => {
        setup();
        const cancelBtn = screen.getByTestId("cancel-btn");
        userEvent.click(cancelBtn);
        expect(window.location.href).toBe(window.location.origin + "/");
    });

    it("should throw an error if typing NaN in Price input", async () => {
        setup();
        const priceInput = screen.getByTestId("price");
        userEvent.type(priceInput, "e");

        const submitBtn = screen.getByTestId("edit-or-add");
        await userEvent.click(submitBtn);
        expect(screen.getByText("This field contains number only")).toBeInTheDocument();
    });

    it("should render toast if all field is filled", async () => {
        const { container } = setup();
        const brandInput = screen.getByTestId("brand");
        const titleInput = screen.getByTestId("title");
        const priceInput = screen.getByTestId("price");
        const descriptionInput = screen.getByTestId("description");
        userEvent.type(brandInput, "Apple");
        userEvent.type(titleInput, "Iphone 14");
        userEvent.type(priceInput, "1299");
        userEvent.type(descriptionInput, "The new 2022 iphone");

        const submitBtn = screen.getByTestId("edit-or-add");
        userEvent.click(submitBtn);
        mockedApi.post.mockResolvedValue(mockApiData);
        await act(async () => {
            await Promise.resolve();
        });
        await waitFor(
            () => {
                expect(within(container).queryByTestId("toast-container")).toBeNull();
            },
            { timeout: 4100 }
        );
    });

    it("should render the product's details", async () => {
        mockedApi.get.mockResolvedValue(mockApiData);
        const { container } = setup();
        const brandInput = screen.getByTestId<HTMLInputElement>("brand");
        const titleInput = screen.getByTestId<HTMLInputElement>("title");
        const priceInput = screen.getByTestId<HTMLInputElement>("price");
        const descriptionInput = screen.getByTestId<HTMLInputElement>("description");
        fireEvent.change(brandInput, { target: { value: mockApiData.data.brand } });
        fireEvent.change(titleInput, { target: { value: mockApiData.data.title } });
        fireEvent.change(priceInput, { target: { value: mockApiData.data.price } });
        fireEvent.change(descriptionInput, { target: { value: mockApiData.data.description } });
        expect(brandInput.value).toBe(mockApiData.data.brand);
        expect(titleInput.value).toBe(mockApiData.data.title);
        expect(+priceInput.value).toBe(mockApiData.data.price);
        expect(descriptionInput.value).toBe(mockApiData.data.description);
        const submitBtn = screen.getByTestId("edit-or-add");
        await userEvent.click(submitBtn);
        mockedApi.put.mockResolvedValue(mockApiData);
        await act(async () => {
            await Promise.resolve();
        });
        await waitFor(
            () => {
                expect(within(container).queryByTestId("toast-container")).toBeNull();
            },
            { timeout: 5000 }
        );
    });
});
