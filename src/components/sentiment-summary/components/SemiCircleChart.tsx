import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const SemiCircleChart = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new("semi-circle-chart");
    root?._logo?.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        startAngle: 180,
        endAngle: 360,
        layout: root.verticalLayout,
        innerRadius: am5.percent(85),
        paddingTop: 16,
        paddingLeft: 4,
        paddingRight: 4,
      })
    );

    chart.seriesContainer.children.push(
      am5.Label.new(root, {
        textAlign: "center",
        centerY: am5.percent(85),
        centerX: am5.p50,
        text: "[fontSize:14px bold]75% positive:\n[fontSize:12px]Based on 83% of messages with \npositive or negative sentiment[/]",
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        startAngle: 180,
        endAngle: 360,
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      })
    );

    series.states.create("hidden", {
      startAngle: 180,
      endAngle: 180,
    });

    series.slices.template.setAll({
      cornerRadius: 0,
      strokeOpacity: 1,
      strokeWidth: 1,
      stroke: am5.color("#FFFFFF"),
      stateAnimationDuration: 100,
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText:
          "[fontSize:12px bold]{valuePercentTotal.formatNumber('0.00')}%[/] [fontSize:12px] customer with \n{category} sentiment \nScore({category}):{value}[/]",
        // getFillFromSprite: false,
        // background: am5.Graphics.new(root, {
        //   fill: am5.color("#FFFFFF"),
        // }),
      }),
    });

    series.slices.template.set("toggleKey", "none");
    series.slices.template.states.create("hover", {
      scale: 1,
    });

    series.slices.template.adapters.add("fill", (fill, target) => {
      return am5.color(target?.dataItem?.dataContext?.color);
    });

    series.labels.template.setAll({
      fill: am5.color("#2b2d42"),
      fontSize: 12,
      fontFamily: "Fira Sans",
      fontWeight: "normal",
      textAlign: "center",
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 4,
      paddingBottom: 4,
      text: "{category}",
    });

    series.ticks.template.setAll({
      forceHidden: true,
    });

    series.data.setAll([
      { value: 10, category: "Very Positive", color: "#45B75B" },
      { value: 8, category: "Positive", color: "#B3D840" },
      { value: 4, category: "Mixed", color: "#FFD541" },
      { value: 2, category: "Negative", color: "#FF9A40" },
      { value: 1, category: "Very Negative", color: "#F3444F" },
      { value: 3, category: "No Sentiment", color: "#D8D8D8" },
    ]);

    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15,
      })
    );
    legend.labels.template.setAll({
      fill: am5.color("#2b2d42"),
      fontSize: 12,
      fontFamily: "Fira Sans",
      fontWeight: "normal",
      textAlign: "center",
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 4,
      paddingBottom: 4,
      text: "{category}: {value}",
    });
    legend.valueLabels.template.setAll({
      forceHidden: true,
    });
    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div
      id="semi-circle-chart"
      style={{ backgroundColor: "transparent", width: "100%", height: "280px" }}
    ></div>
  );
};

export default SemiCircleChart;
