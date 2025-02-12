import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { data } from "./test";

const colors = [
  "#6771DC",
  "#A367DB",
  "#DC8C67",
  "#DDD267",
  "#DD6788",
  "#A0DC67",
  "#67DB76",
  "#DD67CE",
  "#67DBDB",
  "#DB67A3",
];

function BubbleChartMock() {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");
    root?._logo?.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    let container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
    let series = container.children.push(
      am5hierarchy.Pack.new(root, {
        singleBranchOnly: true,
        nodePadding: 6,
        downDepth: 2,
        initialDepth: 2,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        // tooltip: am5.Tooltip.new(root, {
        //   paddingBottom: 0,
        //   paddingLeft: 0,
        //   paddingRight: 0,
        //   paddingTop: 0,
        //   background: am5.Rectangle.new(root, {
        //     strokeWidth: 0,
        //     fillOpacity: 0,
        //   }),
        // }),
      })
    );

    series.circles.template.setAll({
      fillOpacity: 0.5,
      strokeWidth: 1,
      strokeOpacity: 1,
    });

    series.labels.template.setAll({
      fill: am5.color("#2b2d42"),
      fontSize: 12,
      fontFamily: "Fira Sans",
      fontWeight: "normal",
      textAlign: "center",
      breakWords: true,
    });

    series.circles.template.adapters.add("stroke", function (stroke, target) {
      if (target?.dataItem?.dataContext?.name === "Root") return undefined;
      if (target?.dataItem?.dataContext?.showLabel === false) {
        return am5.color(target?.dataItem?.dataContext?.color);
      }
      return stroke;
    });

    series.circles.template.adapters.add("fill", function (fill, target) {
      if (target?.dataItem?.dataContext?.name === "Root") return undefined;
      if (target?.dataItem?.dataContext?.showLabel === false)
        return am5.color("#FFFFFF");
      return fill;
    });

    series.labels.template.adapters.add(
      "forceHidden",
      function (hidden, target) {
        if (target?.dataItem?.dataContext?.showLabel === false) return true;
        if (target?.dataItem?.dataContext?.name === "Root") return true;
        return hidden;
      }
    );

    // series.nodes.template.setAll({
    //   tooltip: am5.Tooltip.new(root, {
    //     paddingBottom: 2,
    //     paddingLeft: 4,
    //     paddingRight: 4,
    //     paddingTop: 2,

    //     background: am5.Rectangle.new(root, {
    //       strokeWidth: 0,
    //       fillOpacity: 1,
    //     }),
    //   }),
    // });

    // series.nodes.template.adapters.add("tooltipHTML", function (html, target) {
    //   if (target?.dataItem?.dataContext?.name === "Root") return undefined;
    //   if (target?.dataItem?.dataContext?.showLabel === false) {
    //     return `<div class="px-2 text-gray-900 py-1.5 text-xs font-medium" style="background-color: ${target?.dataItem?.dataContext?.color}">
    //         {name}
    //       </div>`;
    //   }
    //   return `<div class="px-2 py-1.5 text-xs font-medium">
    //       {name}: {value}
    //     </div>`;
    // });

    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);

    // Make stuff animate on load
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}
export default BubbleChartMock;
