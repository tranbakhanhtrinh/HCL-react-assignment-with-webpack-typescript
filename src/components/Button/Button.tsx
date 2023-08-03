import React, { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";
import isEqual from "react-fast-compare";

interface Props extends IButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

interface IButtonProps {
    primary?: boolean;
    secondary?: boolean;
    success?: boolean;
    danger?: boolean;
    warning?: boolean;
    info?: boolean;
    light?: boolean;
    dark?: boolean;
};

const StyleButton = styled.button<IButtonProps>`
    --bs-btn-padding-x: 0.75rem;
    --bs-btn-padding-y: 0.375rem;
    --bs-btn-font-family: ;
    --bs-btn-font-size: 1rem;
    --bs-btn-font-weight: 400;
    --bs-btn-line-height: 1.5;
    --bs-btn-color: ${(props) => (props.primary || props.secondary || props.success || props.danger || props.dark ? "#fff" : props.warning || props.info || props.light ? "#000" : "#212529")};
    --bs-btn-bg: ${(props) => (props.primary ? "#0d6efd" : props.secondary ? "#6c757d" : props.success ? "#198754" : props.danger ? "#dc3545" : props.warning ? "#ffc107" : props.info ? "#0dcaf0" : props.light ? "#f8f9fa" : props.dark ? "#212529" : "transparent")};
    --bs-btn-border-width: 1px;
    --bs-btn-border-color: transparent;
    --bs-btn-border-radius: 0.375rem;
    --bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
    --bs-btn-disabled-opacity: 0.65;
    --bs-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--bs-btn-focus-shadow-rgb), 0.5);
    display: inline-block;
    padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
    font-family: var(--bs-btn-font-family);
    font-size: var(--bs-btn-font-size);
    font-weight: var(--bs-btn-font-weight);
    line-height: var(--bs-btn-line-height);
    color: var(--bs-btn-color);
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
    border-radius: var(--bs-btn-border-radius);
    background-color: var(--bs-btn-bg);
    -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    &:hover {
    }
`;

const rerenderOrNot = (pre: any,next:any) => isEqual(pre,next);

const Button: React.FC<Props> = ({ type, onClick, children, className, disabled, ...styleProps }) => {
    return (
        <StyleButton type={type} onClick={onClick} className={` ${className ?? ""}`} disabled={disabled} {...styleProps}>
            {children}
        </StyleButton>
    );
};

export default React.memo(Button,rerenderOrNot);
