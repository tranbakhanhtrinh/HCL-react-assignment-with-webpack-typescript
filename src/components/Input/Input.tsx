import { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from "react";
import "./Input.scss";
import styled from "styled-components";

export interface Props extends IInputProps {
    id?: string;
    label?: string;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onKeyPress?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error?: string;
    type?: string;
    name?: string;
    disabled?: boolean;
    value?: string | number;
    checked?: boolean;
    className?: string;
}

type IInputProps = {
    invalid?: boolean;
};

const StyledInput = styled.input<IInputProps>`
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid ${(props) => (props.invalid ? "red" : "#ced4da")};
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.375rem;
    -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    &:focus {
        color: #212529;
        background-color: #fff;
        border-color: #86b7fe;
        outline: 0;
        box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
    }
`;

const StyledCheckbox = styled.input.attrs(() => ({ type: "checkbox" }))`
    width: 1em;
    height: 1em;
    margin-top: 0.25em;
    vertical-align: top;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 1px solid rgba(0, 0, 0, 0.25);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    &:checked {
        background-color: #0d6efd;
        border-color: #0d6efd;
        &[type="checkbox"] {
            background-image: url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3e%3cpath fill=%27none%27 stroke=%27%23fff%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%273%27 d=%27m6 10 3 3 6-6%27/%3e%3c/svg%3e");
        }
    }
    &[type="checkbox"] {
        border-radius: 0.25em;
    }
`;
const StyledLabel = styled.label`
    margin-bottom: 0.5rem;
`;

const Input: React.FC<Props> = ({ id, label, onChange, onFocus, onBlur, onKeyPress, error, type, checked, ...inputProps }) => {
    return (
        <div className="input">
            {type !== "checkbox" ? (
                <>
                    <StyledLabel htmlFor={id}>{label}</StyledLabel>
                    <StyledInput id={id} onChange={onChange} onFocus={onFocus} onBlur={onBlur} onKeyPress={onKeyPress} invalid={error ? true : false}  {...inputProps} />
                </>
            ) : (
                <>
                    <StyledCheckbox id={id} onChange={onChange} invalid={error ? true : false} checked={checked} {...inputProps} />
                    <StyledLabel htmlFor={id}>{label}</StyledLabel>
                </>
            )}
            {error ? (
                <div className="error-message" data-testid="error-message">
                    {error}
                </div>
            ) : (
                type !== "checkbox" && <div style={{ height: 24 }}></div>
            )}
        </div>
    );
};

export default Input;
