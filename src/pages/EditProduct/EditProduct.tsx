import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "components/Form/Form";
import { api } from "helpers/axios";

const EditProduct: React.FC = () => {
    const [initialValues, setInitialValues] = useState<{} | null>(null);
    const { id } = useParams();
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const isEdit = queryParams.get("edit");
    const isEdit = window.location.href.indexOf("edit") > -1;
    useEffect(() => {
        if (isEdit) {
            api.get(`/products/${id}`).then(({ data }) => {
                setInitialValues(data);
            });
        } else setInitialValues(null);
    }, [id, isEdit]);
    return (
        <section className="edit-product mt-4">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Form initialValues={initialValues} isEdit={isEdit} productId={id} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditProduct;
