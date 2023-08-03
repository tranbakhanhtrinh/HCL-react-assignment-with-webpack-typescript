import { ChangeEvent, useMemo } from "react";
import { Link } from "react-router-dom";
import { formConfig } from "constants/formConfig";
import { api } from "helpers/axios";
import { getInitialValues } from "helpers/form/getInitialValues";
import useToast from "hooks/useToast";
import useValidate from "hooks/useValidate";
import Button from "../Button/Button";

interface Props {
    initialValues: {} | null;
    isEdit: boolean;
    productId: string | undefined;
}

const Form: React.FC<Props> = ({ initialValues, isEdit, productId }) => {
    const { success } = useToast();
    const vals = useMemo(() => {
        const init = getInitialValues(formConfig, initialValues);
        return init;
    }, [initialValues]);
    const { values, errors, handleOnChange, handleOnSubmit } = useValidate({
        initialValues: vals,
        onSubmit: async (e: any) => {
            if (isEdit) {
                await api.put(`/products/${productId}`, {
                    body: JSON.stringify(e),
                });
                success("Successfully edited");
            } else {
                await api.post("/products/add", {
                    body: JSON.stringify(e),
                });
                success("Successfully added");
            }
        },
    });
    const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name, type } = event.target;
        let val;
        if (type === "number") val = Number(value);
        else val = value;
        handleOnChange({ name: name, value: val });
    };
    return (
        <div className="row">
            <div className="col-12">
                <form onSubmit={handleOnSubmit}>
                    {formConfig.map(({ key, id, label, type, name, Component, disabled, ...others }) => (
                        <Component key={key} id={id} type={type} name={name} label={label} onChange={handleOnChangeInput} disabled={disabled} value={values[key]} error={errors[key]} data-testid={key} {...others} />
                    ))}
                    <Button type="submit" className="me-3" primary >
                        <span data-testid="edit-or-add">{isEdit ? "Edit" : "Add"}</span>
                    </Button>
                    <Link to={`/`} className="btn btn-danger text-decoration-none">
                        <span data-testid="cancel-btn">Cancel</span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Form;
