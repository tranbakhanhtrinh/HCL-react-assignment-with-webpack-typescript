import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToastContainer from "../components/Toast/ToastContainer";
import ToastProvider from "../contexts/ToastContext";
import { ToastContext } from "../contexts/ToastContext";
import { useContext, memo } from "react";

afterAll(cleanup);
let TestComponent = memo(() => {
    const { addToast, removeToast, toasts } = useContext(ToastContext);
    return (
        <>
            <ToastContainer toasts={toasts} />
            <button data-testid="addToast" onClick={() => addToast("Good", "success")}>
                Add Toast
            </button>
            <button data-testid="removeToast" onClick={() => removeToast(toasts[0].id)}>
                Remove Toast
            </button>
        </>
    );
});
describe("Toast Container", () => {
    afterEach(cleanup);
    it("should not render toast container if toasts are empty", () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );
        expect(screen.queryByTestId(/toast-container/i)).toBeNull();
    });

    it("should render toast container if clicking addToast button", async () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );
        expect(screen.getByTestId(/addToast/i)).toBeInTheDocument();
        const addBtn = screen.getByTestId(/addToast/i);
        await userEvent.click(addBtn);
        expect(screen.getAllByTestId(/toast-container/i).length).toBe(2);
    });

    it("should remove the specified toast", async () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );
        expect(screen.getByTestId(/addToast/i)).toBeInTheDocument();
        expect(screen.getByTestId(/removeToast/i)).toBeInTheDocument();
        const addBtn = screen.getByTestId(/addToast/i);
        const removeBtn = screen.getByTestId(/removeToast/i);
        await userEvent.click(addBtn);
        expect(screen.getAllByTestId(/toast-container/i).length).toBe(2);
        await userEvent.click(removeBtn);
        expect(screen.queryByTestId(/toast-container/i)).toBeNull();
        // screen.debug()
    });

    it("should remove the specified toast if clicking X button", async () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );
        expect(screen.getByTestId(/addToast/i)).toBeInTheDocument();
        const addBtn = screen.getByTestId(/addToast/i);
        await userEvent.click(addBtn);
        const allBtn = screen.getAllByTestId(/close-toast-btn/i);
        for (const btn of allBtn) {
            await userEvent.click(btn);
        }
        expect(screen.queryByTestId(/toast-container/i)).not.toBeInTheDocument();
    });

    it("should close the specified toast when animation ends", async () => {
        const { container } = render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );
        expect(screen.getByTestId(/addToast/i)).toBeInTheDocument();
        const addBtn = screen.getByTestId(/addToast/i);
        await userEvent.click(addBtn);
        expect(screen.getAllByTestId(/toast-container/i).length).toBe(2);
        await waitFor(
            () => {
                expect(within(container).queryByTestId("toast-container")).toBeNull();
            },
            { timeout: 4100 }
        );
    });
});
