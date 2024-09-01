import React, { useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const TodayTotalHitBarchart = ({ data }) => {
    useLayoutEffect(() => {
        // Create chart instance
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        // Add data
        chart.data = data;

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "service";
        categoryAxis.title.text = "Service";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Hit";

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "hit";
        series.dataFields.categoryX = "service";
        series.name = "Hit";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = 0.8;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;

        // Add chart title
        let title = chart.titles.create();
        title.text = "Today Total Hit";
        title.fontSize = 25;
        title.marginBottom = 20;

        return () => {
            chart.dispose();
        };
    }, [data]);

    return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default TodayTotalHitBarchart;
