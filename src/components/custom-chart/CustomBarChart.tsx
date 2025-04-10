import { getSentimentColorByValue } from "../../utils/helper";
import CustomBar from "./CustomBar";

interface CustomBarChartProps {
  topic: {
    name: string;
    total: number;
    color: string;
    sentiments: {
      positive: number;
      negative: number;
      neutral: number;
      mixed: number;
    };
  };
}

const CustomBarChart = ({
  topic: { name, total, sentiments, color = "gray" },
}: CustomBarChartProps) => {
  return (
    <div className="w-full">
      <div
        className="text-sm font-medium flex items-center mb-1"
        style={{ borderLeftColor: color }}
      >
        <span
          className="w-1.5 h-4 inline-block rounded-sm mr-1"
          style={{ backgroundColor: color }}
        ></span>
        {name}
      </div>
      <div className="flex w-full overflow-clip rounded-sm">
        {Object.entries(sentiments).map(([sentiment, value]) => (
          <CustomBar
            key={sentiment}
            sentiment={sentiment}
            sentimentValue={value}
            total={total}
            bgColor={getSentimentColorByValue(sentiment)}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomBarChart;
