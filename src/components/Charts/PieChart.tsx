import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect, useState } from "react";
import ChartData from "./ChartData";

const PieChart = () => {
    // Define data
    let data = [
        {
            country: "France",
            label: "France",
            sales: 100000,
        },
        {
            country: "Spain",
            label: "Spain",
            sales: 160000,
        },
        {
            country: "United Kingdom",
            label: "United Kingdom",
            sales: 80000,
        },
        {
            country: "USA",
            label: "USA",
            sales: 230000,
        },
        {
            country: "Italy",
            label: "Italy",
            sales: 158593,
        },
    ];
    const initialCheckedData = data.map((d) => ({ ...d, checked: false })).reduce((t:any[],currentValue:any, currentIndex) =>
        (currentIndex < 2 ? t.push({...currentValue, checked: true}) : t.push(currentValue), t)
    ,[])

    const [checkedData, setCheckedData] = useState(initialCheckedData);
    const [renderedData, setRenderedData] = useState(checkedData.filter(d => d.checked === true));
    useLayoutEffect(() => {
        // Create root and chart
        let root = am5.Root.new("pieChartdiv");
        root.setThemes([am5themes_Animated.new(root)]);
        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout,
            })
        );

        // Create series
        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Series",
                valueField: "sales",
                categoryField: "label",
            })
        );
        series.data.setAll(renderedData);

        // Add legend
        let legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.percent(50),
                x: am5.percent(50),
                layout: root.horizontalLayout,
            })
        );
        series.appear();
        chart.appear();

        legend.data.setAll(series.dataItems);
        return () => root.dispose();
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
                <div id="pieChartdiv" style={{ width: "100%", height: "500px" }}></div>
            </div>
        </div>
    );
};

export default PieChart;
