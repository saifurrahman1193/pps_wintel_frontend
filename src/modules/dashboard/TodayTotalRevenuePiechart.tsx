import  { useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const TodayTotalRevenuePiechart = ({ data }:any) => {
    useLayoutEffect(() => {
        // Create chart instance
        let chart = am4core.create("TodayTotalRevenuePiechart", am4charts.PieChart);

        // Add data
        chart.data = data;

        // Define a color set with 6 colors
        let colorSet = new am4core.ColorSet();
        colorSet.list = [
            am4core.color("#d602ee"), // Color 1
            am4core.color("#2ab57d"), // Color 2
            am4core.color("#5156be"), // Color 3
            am4core.color("#ee6002"), // Color 4
            am4core.color("#ee0290"), // Color 5
            am4core.color("#ffbf53")  // Color 6
        ];

        // Create series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "hit";
        pieSeries.dataFields.category = "service";
        pieSeries.slices.template.tooltipText = "{category}: [bold]{value}[/]";

        // Assign colors to slices
        pieSeries.slices.template.adapter.add("fill", (fill, target) => {
            if (target.dataItem) {
                return colorSet.getIndex(target.dataItem.index % colorSet.list.length);
            } else {
                // Handle the case where target.dataItem is undefined
                return fill;
            }
        });

        // Add chart title
        let title = chart.titles.create();
        title.text = "Today's Total Revenue (BDT)";
        title.fontSize = 25;
        title.marginBottom = 20;

        // Add legend
        chart.legend = new am4charts.Legend();

        return () => {
            chart.dispose();
        };
    }, [data]);

    return <div id="TodayTotalRevenuePiechart" style={{ width: "100%", height: "450px" }}></div>;
};

export default TodayTotalRevenuePiechart;
