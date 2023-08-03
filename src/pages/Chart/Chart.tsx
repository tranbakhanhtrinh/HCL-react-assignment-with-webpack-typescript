import Select from "components/Select/Select";
import PieChart from "components/Charts/PieChart";
import { useCallback, useEffect, useState } from "react";
import ChartXY from "components/Charts/ChartXY";
import RadarChart from "components/Charts/RadarChart";
import StockChart from "components/Charts/StockChart";

enum chartType {
    XY = "XY",
    PIE = "Pie",
    RADAR = "Radar",
    STOCK = "Stock",
}

const Chart = () => {
    const [chart, setChart] = useState<string>(chartType.XY);
    const options = [chartType.XY, chartType.PIE, chartType.RADAR, chartType.STOCK];
    const handleSelectOnChange = (e: any) => {
        setChart(e.target.value);
    };

    const renderChart = useCallback(() => {
        switch (chart) {
            case chartType.XY:
                return <ChartXY />;
            case chartType.PIE:
                return <PieChart />;
            case chartType.RADAR:
                return <RadarChart />;
            case chartType.STOCK:
                return <StockChart />;
            default:
                return <ChartXY />;
        }
    }, [chart]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <Select id="chartSlection" label="Chart Selection" onChange={handleSelectOnChange} options={options}></Select>
                    {renderChart()}
                </div>
            </div>
        </div>
    );
};

export default Chart;
