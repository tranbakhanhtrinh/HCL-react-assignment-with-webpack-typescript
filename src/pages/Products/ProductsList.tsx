import { useEffect, useState } from "react";
import { api } from "../../helpers/axios";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { setProducts } from "../../redux/actions";
import Products from "../../components/Products/Products";

type PropsType = {
    setError: (e: string) => void;
    setShowModal: (e: boolean) => void;
    setProductId: (e: number) => void;
};

const ProductsList = ({ setError, setShowModal, setProductId }: PropsType) => {
    const [skip, setSkip] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);
    const dispatch = useAppDispatch();

    const products = useAppSelector((state) => state.product.products);
    useEffect(() => {
        api.get(`/products?skip=${skip}&limit=${limit}`)
            .then(({ data }) => {
                dispatch(setProducts(data?.products));
            })
            .catch((error) => {
                setError(error.message);
            });
    }, [limit, skip]);

    const productsList = products?.map((product) => <Products key={product.title} product={product} onDelete={() => onDelete(product.id)} />);
    const onDelete = (id: number) => {
        setShowModal(true);
        setProductId(id);
    };
    return <div className="d-flex flex-wrap justify-content-around justify-content-xl-start mt-4">{productsList}</div>;
};

export default ProductsList;
