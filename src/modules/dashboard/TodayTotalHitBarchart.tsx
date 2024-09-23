import  { useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const TodayTotalHitBarchart = ({ data }:any) => {
    useLayoutEffect(() => {
        // Create chart instance
        let chart = am4core.create("TodayTotalHitBarchart", am4charts.XYChart);

        // Add data
        chart.data = data;

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "service";
        categoryAxis.title.text = "Service";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Hit";

        // Rotate X-axis labels
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.renderer.minGridDistance = 30; // Adjust this value as needed

        // Define a color set with 6 colors
        let colorSet = new am4core.ColorSet();
        colorSet.list = [
            am4core.color("#ffd373"), // Color 3
            am4core.color("#fd8021"), // Color 2
            am4core.color("#e05400"), // Color 1
            am4core.color("#0073cc"), // Color 5
            am4core.color("#003488"), // Color 4
            am4core.color("#001d59"),  // Color 6
            am4core.color("#001524")  // Color 7
        ];

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "hit";
        series.dataFields.categoryX = "service";
        series.name = "Hit";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = 0.8;

        // Assign colors to columns
        series.columns.template.adapter.add("fill", (fill, target) => {
            if (target.dataItem) {
                return colorSet.getIndex(target.dataItem.index % colorSet.list.length);
            } else {
                // Handle the case where target.dataItem is undefined
                return fill;
            }
        });
       


        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;

        // Add chart title
        let title = chart.titles.create();
        title.text = "Today's Total Hit";
        title.fontSize = 25;
        title.marginBottom = 20;

        return () => {
            chart.dispose();
        };
    }, [data]);

    return <div id="TodayTotalHitBarchart" style={{ width: "100%", height: "450px" }}></div>;
};

export default TodayTotalHitBarchart;
