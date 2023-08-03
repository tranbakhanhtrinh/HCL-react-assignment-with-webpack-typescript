import React, { ChangeEventHandler } from "react";

export interface Props {
    id: string;
    label: string;
    onChange?: ChangeEventHandler<HTMLSelectElement>;
    options: string[]
}
const Select:React.FC<Props> = ({ id, label, onChange, options }) => {
    return (
        <div className="input my-5">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <select className={`form-select`} id={id} onChange={onChange}>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );
};

export default Select;

