import Input, { Props } from "components/Input/Input";
import React from "react";

interface ChartDataProps extends Props {
    data: any[];
}

const ChartData: React.FC<ChartDataProps> = ({ data, onChange }) => {
    const handleOnChange = (index:any) => {
        if(onChange) onChange(index)
    }   
    return (
        <div>
            <h4 className="mb-5">Data</h4>
            {data.map((d, index) =>  (
                <Input key={`${d.label}-${index}`} type="checkbox" id={`${d.label}-${index}`} onChange={() => handleOnChange(index)} label={d.label} checked={d.checked} />
            ))}
        </div>
    );
};

export default ChartData;
