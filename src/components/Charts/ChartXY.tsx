import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect, useState } from "react";
import ChartData from "./ChartData";

const ChartXY = () => {
    // Define data
    let data = [
        {
            category: "Research",
            label: "Research",
            value1: 1000,
            value2: 588,
        },
        {
            category: "Marketing",
            label: "Marketing",
            value1: 1200,
            value2: 1800,
        },
        {
            category: "Sales",
            label: "Sales",
            value1: 850,
            value2: 1230,
        },
        {
            category: "BD",
            label: "BD",
            value1: 279,
            value2: 782,
        },
    ];
    const initialCheckedData = data.map((d) => ({ ...d, checked: false })).reduce((t:any[],currentValue:any, currentIndex) =>
        (currentIndex < 2 ? t.push({...currentValue, checked: true}) : t.push(currentValue), t)
    ,[])

    const [checkedData, setCheckedData] = useState(initialCheckedData);
    const [renderedData, setRenderedData] = useState(checkedData.filter(d => d.checked === true));
    useLayoutEffect(() => {
        let root = am5.Root.new("chartdiv");

        root.setThemes([am5themes_Animated.new(root)]);

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panY: false,
                layout: root.verticalLayout,
            })
        );

        // Create Y-axis
        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {}),
            })
        );

        // Create X-Axis
        let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                renderer: am5xy.AxisRendererX.new(root, {}),
                categoryField: "label",
            })
        );
        xAxis.data.setAll(renderedData);

        // Create series
        let series1 = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "Series1",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value1",
                categoryXField: "label",
            })
        );
        series1.data.setAll(renderedData);

        let series2 = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "Series2",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value2",
                categoryXField: "label",
            })
        );
        series2.data.setAll(renderedData);

        // Add legend
        let legend = chart.children.push(am5.Legend.new(root, {}));
        legend.data.setAll(chart.series.values);

        // Add cursor
        chart.set("cursor", am5xy.XYCursor.new(root, {}));

        return () => {
            root.dispose();
        };
    }, [renderedData]);

    const handleCheckedData = (e: any) => {
        const updatedCheckedState = checkedData.map((item,index) => index === e ? {...item, checked: !item.checked} : {...item, checked: item.checked});
        setCheckedData(updatedCheckedState)
        setRenderedData(updatedCheckedState.filter(d => d.checked === true))
    };

    return (
        <div className="row">
            <div className="col-xl-3">
                <ChartData data={checkedData} onChange={handleCheckedData} />
            </div>
            <div className="col-xl-9">
                <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
            </div>
        </div>
    );
};

export default ChartXY;
