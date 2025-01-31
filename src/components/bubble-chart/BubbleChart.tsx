// Types.ts
interface BubbleData {
  id: number;
  value: number;
  label: string;
  totalUsers?: number;
  category?: string;
}

interface TooltipState {
  show: boolean;
  text: string;
  x: number;
  y: number;
}

interface BubbleChartProps {
  data: BubbleData[];
  width?: number;
  height?: number | string;
  minRadius?: number;
  maxRadius?: number;
  borderWidth?: number;
  colors?: string[];
  padding?: number;
}

// BubbleChart.tsx
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BubbleChart: React.FC<BubbleChartProps> = ({
  data = [],
  width = 600,
  height = 600,
  minRadius = 40,
  maxRadius = 80,
  borderWidth = 16,
  colors = ["#FF0000", "#00FF00", "#FFD700"],
  padding = 10,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    show: false,
    text: "",
    x: 0,
    y: 0,
  });

  // Tooltip content definitions
  const segmentTooltips: string[] = [
    "Red Segment: Performance Metrics",
    "Green Segment: Growth Statistics",
    "Yellow Segment: User Engagement",
  ];

  const getInnerCircleTooltip = (d: BubbleData): string => `
      Value: ${d.value}
      Total Users: ${d.totalUsers || "N/A"}
      Category: ${d.category || "General"}
    `;

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3
      .select(svgRef.current)
      .attr(
        "viewBox",
        `-${width / 2} -${height / 2} ${width * 2} ${height * 2}`
      )
      .attr("width", width)
      .attr("height", height)
      .attr(
        "style",
        `max-width: 100%; height: auto; display: block; margin: 0 auto; background: lightblue;`
      );

    // Scale for bubble sizes
    const radiusScale = d3
      .scaleSqrt<number>()
      .domain([
        d3.min(data, (d) => d.value) || 0,
        d3.max(data, (d) => d.value) || 100,
      ])
      .range([minRadius, maxRadius]);

    // Type definition for simulation nodes
    interface SimulationNode extends d3.SimulationNodeDatum, BubbleData {}

    // Create force simulation
    const simulation = d3
      .forceSimulation<SimulationNode>(data as SimulationNode[])
      .force("center", d3.forceCenter<SimulationNode>(width / 2, height / 2))
      .force(
        "collision",
        d3
          .forceCollide<SimulationNode>()
          .radius((d) => radiusScale(d.value) + padding)
      )
      .force("x", d3.forceX<SimulationNode>(width / 2).strength(0.1))
      .force("y", d3.forceY<SimulationNode>(height / 2).strength(0.1));

    // Create a group for each bubble
    const bubbles = svg
      .selectAll<SVGGElement, SimulationNode>(".bubble")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bubble");

    // Function to create arc segments for border
    const createArcGenerator = (radius: number) => {
      return d3
        .arc<any, number>()
        .innerRadius(radius - borderWidth)
        .outerRadius(radius)
        .startAngle((_, i) => (i * 2 * Math.PI) / 3)
        .endAngle((_, i) => ((i + 1) * 2 * Math.PI) / 3);
    };

    // Function to handle tooltip show
    const showTooltip = (event: MouseEvent, text: string): void => {
      console.log({
        pageX: event.x,
        screenX: event.screenX,
        y: event.y,
      });
      setTooltip({
        show: true,
        text,
        x: event.pageX,
        y: event.pageY - 4,
      });
    };

    // Function to handle tooltip hide
    const hideTooltip = (): void => {
      setTooltip((prev) => ({ ...prev, show: false }));
    };

    // For each bubble, create the segments and inner circle
    bubbles.each(function (d) {
      const radius = radiusScale(d.value);
      const g = d3.select(this);

      // Create border segments with tooltips
      colors.forEach((color, i) => {
        const segment = g
          .append("path")
          .attr("d", createArcGenerator(radius)({}, i))
          .style("fill", color)
          .style("cursor", "pointer");

        // Add segment tooltip events
        segment
          .on("mousemove", (event: MouseEvent) => {
            showTooltip(event, segmentTooltips[i]);
          })
          .on("mouseout", hideTooltip);
      });

      // Create inner circle with tooltip
      const innerCircle = g
        .append("circle")
        .attr("r", radius - borderWidth - 2)
        .attr("fill", "white")
        .style("cursor", "pointer");

      // Add inner circle tooltip events
      innerCircle
        .on("mousemove", (event: MouseEvent) => {
          showTooltip(event, getInnerCircleTooltip(d));
        })
        .on("mouseout", hideTooltip);

      // Add label
      g.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "16px")
        .text(d.label)
        .style("pointer-events", "none");
    });

    // Update bubble positions based on simulation
    simulation.on("tick", () => {
      bubbles.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, [data, width, height, minRadius, maxRadius, borderWidth, colors, padding]);

  return (
    <div className="bg-gray-100">
      <svg ref={svgRef} />

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="fixed z-10 px-3 py-2 text-sm text-white bg-gray-800 rounded shadow-lg pointer-events-none whitespace-pre-line"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

// Example usage with TypeScript
const BubbleChartExample: React.FC = () => {
  const sampleData: BubbleData[] = [
    {
      id: 1,
      value: 100,
      label: "Bubble 1",
      totalUsers: 1500,
      category: "Product A",
    },
    {
      id: 2,
      value: 150,
      label: "Bubble 2",
      totalUsers: 1200,
      category: "Product B",
    },
    {
      id: 3,
      value: 60,
      label: "Bubble 3",
      totalUsers: 900,
      category: "Product C",
    },
    {
      id: 4,
      value: 70,
      label: "Bubble 4",
      totalUsers: 1100,
      category: "Product D",
    },
    {
      id: 5,
      value: 90,
      label: "Bubble 5",
      totalUsers: 1300,
      category: "Product E",
    },
    {
      id: 6,
      value: 90,
      label: "Bubble 6",
      totalUsers: 1300,
      category: "Product E",
    },
    {
      id: 7,
      value: 90,
      label: "Bubble 7",
      totalUsers: 1300,
      category: "Product E",
    },
    {
      id: 8,
      value: 90,
      label: "Bubble 8",
      totalUsers: 1300,
      category: "Product E",
    },
    {
      id: 9,
      value: 90,
      label: "Bubble 9",
      totalUsers: 1300,
      category: "Product E",
    },
    {
      id: 10,
      value: 90,
      label: "Bubble 10",
      totalUsers: 1300,
      category: "Product E",
    },
  ];

  return (
    <div className="p-4">
      <BubbleChart
        data={sampleData}
        width={600}
        height={500}
        minRadius={50}
        maxRadius={220}
        borderWidth={16}
        colors={["#FF0000", "#00FF00", "#FFD700"]}
        padding={10}
      />
    </div>
  );
};

export default BubbleChartExample;
