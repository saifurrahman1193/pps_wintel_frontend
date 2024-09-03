import React, { useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const Last6MonthTotalHitMonthWiseBarChart = ({ data }) => {
    useLayoutEffect(() => {
        // Create chart instance
        let chart = am4core.create("Last6MonthTotalHitMonthWiseBarChart", am4charts.XYChart);

        // Add data
        chart.data = data;

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "month_name";
        categoryAxis.title.text = "Month";
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.renderer.minGridDistance = 30; // Adjust this value as needed

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Hit";

        // Define a color set with 6 colors
        let colorSet = new am4core.ColorSet();
        colorSet.list = [
            am4core.color("#5156be"), // Color 1
            am4core.color("#2ab57d"), // Color 2
            am4core.color("#d602ee"), // Color 3
            am4core.color("#ee0290"), // Color 4
            am4core.color("#ee6002"), // Color 5
            am4core.color("#ffbf53")  // Color 6
        ];

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "hit";
        series.dataFields.categoryX = "month_name";
        series.name = "Total Hits";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = 0.8;

        // Assign colors to columns
        series.columns.template.adapter.add("fill", (fill, target) => {
            // Cycle through colors in the color set
            return colorSet.getIndex(target.dataItem.index % colorSet.list.length);
        });

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;

        // Add chart title
        let title = chart.titles.create();
        title.text = "Last 6 Months Total Hits";
        title.fontSize = 25;
        title.marginBottom = 20;

        return () => {
            chart.dispose();
        };
    }, [data]);

    return <div id="Last6MonthTotalHitMonthWiseBarChart" style={{ width: "100%", height: "450px" }}></div>;
};

export default Last6MonthTotalHitMonthWiseBarChart;
