import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";

const RadarChart = () => {
    // Define data
    let data = [
        {
            date: new Date(2021, 0, 1).getTime(),
            value: 100,
            value2: 220,
        },
        {
            date: new Date(2021, 0, 2).getTime(),
            value: 320,
            value2: 300,
        },
        {
            date: new Date(2021, 0, 3).getTime(),
            value: 216,
            value2: 120,
        },
        {
            date: new Date(2021, 0, 4).getTime(),
            value: 150,
            value2: 190,
        },
        {
            date: new Date(2021, 0, 5).getTime(),
            value: 156,
            value2: 190,
        },
        {
            date: new Date(2021, 0, 6).getTime(),
            value: 199,
            value2: 120,
        },
        {
            date: new Date(2021, 0, 7).getTime(),
            value: 114,
            value2: 300,
        },
        {
            date: new Date(2021, 0, 8).getTime(),
            value: 269,
            value2: 290,
        },
        {
            date: new Date(2021, 0, 9).getTime(),
            value: 190,
            value2: 290,
        },
        {
            date: new Date(2021, 0, 10).getTime(),
            value: 380,
            value2: 170,
        },
        {
            date: new Date(2021, 0, 11).getTime(),
            value: 250,
            value2: 200,
        },
        {
            date: new Date(2021, 0, 12).getTime(),
            value: 110,
            value2: 210,
        },
        {
            date: new Date(2021, 0, 13).getTime(),
            value: 185,
            value2: 85,
        },
        {
            date: new Date(2021, 0, 14).getTime(),
            value: 105,
            value2: 244,
        },
    ];
    useLayoutEffect(() => {
        let root = am5.Root.new("radarChartdiv");
        let chart = root.container.children.push(am5radar.RadarChart.new(root, {}));
        root.setThemes([am5themes_Animated.new(root)]);

        // Create axes
        let xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                renderer: am5radar.AxisRendererCircular.new(root, {}),
                baseInterval: { timeUnit: "day", count: 1 },
            })
        );

        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5radar.AxisRendererRadial.new(root, {}),
            })
        );

        // Create series
        let series1 = chart.series.push(
            am5radar.RadarColumnSeries.new(root, {
                name: "Series #1",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "date",
            })
        );
        series1.data.setAll(data);

        let series2 = chart.series.push(
            am5radar.RadarColumnSeries.new(root, {
                name: "Series #2",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value2",
                valueXField: "date",
            })
        );
        series2.data.setAll(data);

        // Add legend
        let legend = chart.children.push(am5.Legend.new(root, {}));
        legend.data.setAll(chart.series.values);

        // Add cursor

        chart.set("cursor", am5radar.RadarCursor.new(root, {}));
        return () => root.dispose();
    }, []);
    return <div id="radarChartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default RadarChart;
