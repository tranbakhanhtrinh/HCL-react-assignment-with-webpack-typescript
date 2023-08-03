import React, { Suspense, useState } from "react";
import Button from "components/Button/Button";
import "./Products.scss";
import Loading from "components/Loading/Loading";
import Modal from "components/Modal/Modal";
import { api } from "helpers/axios";
import useToast from "hooks/useToast";
import ErrorComponent from "common/ErrorComponent/ErrorComponent";
import { useAppDispatch } from "redux/app/hook";
import { deleteProduct } from "redux/actions";
import Dropdown from "components/Dropdown/Dropdown";

const ProductsList = React.lazy(() => import("./ProductsList"));

function ProductsPage() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [productId, setProductId] = useState<number>(0);
    const [error, setError] = useState<string>("");
    const { success } = useToast();
    const dispatch = useAppDispatch();

    const onAcceptDelete = async () => {
        try {
            await api.delete(`/products/${productId}`);
            setShowModal(false);
            setProductId(0);
            success("Successfully deleted!");
            dispatch(deleteProduct(productId));
        } catch (error: any) {
            setError(error.message);
        }
    };

    // const onPrevious = () => {};
    // const onNext = () => {};

    const onCloseModal = () => {
        setShowModal(false);
    };

    return (
        <section className="home-product mt-4" data-testid="home-product">
            <div className="container">
                <div className="row">
                    <div className="col-12 position-relative">
                        {showModal && (
                            <Modal onAccept={onAcceptDelete} onCloseModal={onCloseModal}>
                                <h4>Do you want to delete this product?</h4>
                            </Modal>
                        )}
                        {error ? (
                            <ErrorComponent message={error} />
                        ) : (
                            <>
                                <h2 className="text-center title">
                                    <span>Products</span>
                                </h2>
                                <Dropdown />
                                <Suspense fallback={<Loading />}>
                                    <ProductsList setError={(e) => setError(e)} setShowModal={(e) => setShowModal(e)} setProductId={(e) => setProductId(e)} />
                                </Suspense>
                            </>
                        )}

                        {/* <div className="home-product__navigator">
              <Button
                className="btn-prev position-relative"
                onClick={onPrevious}
              ></Button>
              <Button
                className="btn-next position-relative"
                onClick={onNext}
              ></Button>
            </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductsPage;
