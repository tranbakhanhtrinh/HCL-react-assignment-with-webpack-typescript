import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { FormComponent, formConfig } from "constants/formConfig";
import { checkValidity } from "helpers/checkValidity";

interface Props {
    initialValues: {[key: string] : string | number};
    onSubmit: (e: any) => Promise<void>;
}

const useValidate = ({
    initialValues,
    onSubmit,
}: Props): {
    values: {[key: string] : string | number};
    errors:  {[key: string] : string};
    handleOnChange: (e: { name: string; value: string | number }) => void;
    handleOnSubmit: (e: any) => Promise<void>;
} => {
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const setFieldValue = (_field: string, _value: string | number) => {
        setValues((pre:  {[key: string] : string | number}) => ({ ...pre, [_field]: _value }));
    };

    const setFieldTouched = (_field: string, _value: boolean) => {
        setTouched((pre:  {[key: string] : boolean} ) => ({ ...pre, [_field]: _value }));
    };

    const setFieldError = (_field: string, _value: string) => {
        setErrors((pre:  {[key: string] : string}) => ({ ...pre, [_field]: _value }));
    };
    const iEr = Object.keys(initialValues).reduce((acc: { [key: string]: string }, key: string) => ((acc[key] = ""), acc), {});

    useEffect(() => {
        setValues(initialValues);
        setErrors(iEr);
    }, [initialValues]);

    const handleOnChange = (e: { name: string; value: string | number }) => {
        const { name, value } = e;
        setFieldTouched(name, true);
        const fieldName = formConfig.find((f) => f.name === name) as FormComponent;
        const { isValid, message } = checkValidity(value, fieldName.validation);
        if (!isValid) {
            setFieldError(name, message);
        } else setFieldError(name, "");
        setFieldValue(name, value);
    };

    const validValues = useMemo(() => Object.values(values).every((v) => v !== ""), [values]);
    const hasErrors = useMemo(() => Object.values(errors).every((v) => v !== ""), [errors]);

    const handleOnSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let isInvalid;
        isInvalid = hasErrors || !validValues;
        if (isInvalid) {
            for (let key in values) {
                const fieldName = formConfig.find((f) => f.name === key) as FormComponent;
                const { message } = checkValidity(values[key], fieldName.validation);
                setFieldError(key, message);
            }
        } else {
            await onSubmit(values);
        }
    };
    return {
        values,
        errors,
        handleOnChange,
        handleOnSubmit,
    };
};

export default useValidate;
