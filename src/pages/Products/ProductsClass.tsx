import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Button from "components/Button/Button";
import Loading from "components/Loading/Loading";
import Modal from "components/Modal/Modal";
import { deleteProduct, setProducts } from "redux/actions";
import Products from "components/Products/Products";
import { api } from "helpers/axios";
import { Product } from "redux/slices/productSlice";
import { RootState } from "redux/store/store";

type PropsType = {
    products: Product[];
    setProducts: (products: Product[]) => void;
    deleteProduct: (id: number) => void;
};

type StateType = {
    skip: number;
    limit: number;
    page: number;
    showModal: boolean;
    productId: number;
};

export class ProductsClass extends PureComponent<PropsType> {
    constructor(props: PropsType) {
        super(props);
    }

    state: StateType = {
        skip: 0,
        limit: 10,
        page: 1,
        showModal: false,
        productId: 0,
    };

    componentDidMount() {
        api.get(`/products?skip=${this.state.skip}&limit=${this.state.limit}`).then(({ data }) => {
            this.props.setProducts(data?.products);
        });
    }

    onDelete(id: number) {
        this.setState((pre) => ({ ...pre, showModal: true, productId: id }));
    }

    async onAcceptDelete() {
        await api.delete(`/products/${this.state.productId}`);
        this.props.deleteProduct(this.state.productId);
        this.setState((prev) => ({ ...prev, showModal: false, productId: 0 }));
    }
    onCloseModal() {
        this.setState((prev) => ({ ...prev, showModal: false }));
    }
    // onPrevious() {}
    // onNext() {}
    render() {
        const productsList = this.props.products?.map((product) => <Products key={product.title} product={product} onDelete={() => this.onDelete(product.id)} />);
        return (
            <section className="home-product mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12 position-relative">
                            {this.state.showModal && (
                                <Modal onAccept={() => this.onAcceptDelete()} onCloseModal={() => this.onCloseModal()}>
                                    <h4>Do you want to delete this product?</h4>
                                </Modal>
                            )}
                            <h2 className="text-center title">
                                <span>Products</span>
                            </h2>
                            <div className="d-flex flex-wrap justify-content-around justify-content-xl-start mt-4">{!this.props.products ? <Loading /> : productsList}</div>
                            {/* <div className="home-product__navigator">
                                <Button
                                    className="btn-prev position-relative"
                                    // onClick={this.onPrevious}
                                ></Button>
                                <Button
                                    className="btn-next position-relative"
                                    // onClick={this.onNext}
                                ></Button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    products: state.product.products,
});

const mapDispatchToProps = { setProducts, deleteProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ProductsClass);
