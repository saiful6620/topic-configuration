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
        {/* <div
          className="h-[18px] bg-green-300 flex justify-center items-center text-xs"
          style={{ flexBasis: `${(sentiments.positive / total) * 100}%` }}
        >
          {`${Math.round((sentiments.positive / total) * 100)}%`}
        </div>
        <div
          className="h-[18px] bg-red-400 flex justify-center items-center text-xs"
          style={{ flexBasis: `${(sentiments.negative / total) * 100}%` }}
        >
          {`${Math.round((sentiments.negative / total) * 100)}%`}
        </div>
        <div
          className="h-[18px] bg-orange-300 flex justify-center items-center text-xs"
          style={{ flexBasis: `${(sentiments.mixed / total) * 100}%` }}
        >
          {`${Math.round((sentiments.mixed / total) * 100)}%`}
        </div>
        <div
          className="h-[18px] bg-gray-300 flex justify-center items-center text-xs"
          style={{ flexBasis: `${(sentiments.neutral / total) * 100}%` }}
        >
          {`${Math.round((sentiments.neutral / total) * 100)}%`}
        </div> */}
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
