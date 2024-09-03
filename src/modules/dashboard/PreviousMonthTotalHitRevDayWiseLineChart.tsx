import React, { useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { previousMonthName } from '../../components/Helpers/CommonHelpers';

am4core.useTheme(am4themes_animated);

const PreviousMonthTotalHitRevDayWiseLineChart = ({ data }) => {
    useLayoutEffect(() => {
        // Create chart instance
        let chart = am4core.create("PreviousMonthTotalHitRevDayWiseLineChart", am4charts.XYChart);

        // Add data
        chart.data = data;

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "day_name";
        categoryAxis.title.text = "Date";
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.renderer.minGridDistance = 30; // Adjust this value as needed

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Hit & Revenue";

        // Define a color set
        let colorSet = new am4core.ColorSet();
        colorSet.list = [
            am4core.color("#007bff"), // New color for Hit (e.g., blue)
            am4core.color("#28a745")  // New color for Revenue (e.g., green)
        ];

        // Create series for Hit
        let hitSeries = chart.series.push(new am4charts.LineSeries());
        hitSeries.dataFields.valueY = "hit";
        hitSeries.dataFields.categoryX = "day_name";
        hitSeries.name = "Hit";
        hitSeries.strokeWidth = 3; // Adjust line thickness
        hitSeries.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        hitSeries.stroke = colorSet.getIndex(0); // Set line color
        
        // Create series for Revenue
        let revenueSeries = chart.series.push(new am4charts.LineSeries());
        revenueSeries.dataFields.valueY = "revenue";
        revenueSeries.dataFields.categoryX = "day_name";
        revenueSeries.name = "Revenue";
        revenueSeries.strokeWidth = 3; // Adjust line thickness
        revenueSeries.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        revenueSeries.stroke = colorSet.getIndex(1); // Set line color

        // Add chart title
        let title = chart.titles.create();
        title.text = "Last Month: "+previousMonthName+" Total Hit & Revenue";
        title.fontSize = 25;
        title.marginBottom = 20;

        // Add legend
        chart.legend = new am4charts.Legend();

        // Add cursor
        chart.cursor = new am4charts.XYCursor();

        return () => {
            chart.dispose();
        };
    }, [data]);

    return <div id="PreviousMonthTotalHitRevDayWiseLineChart" style={{ width: "100%", height: "450px" }}></div>;
};

export default PreviousMonthTotalHitRevDayWiseLineChart;
