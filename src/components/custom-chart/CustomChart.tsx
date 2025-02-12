import { color } from "d3";
import BubbleChartMock from "../bubble-chart/BubbleChartMock";
import CustomBarChart from "./CustomBarChart";

const topics = [
  {
    name: "Food Quality",
    total: 14,
    color: "#6771DC",
    sentiments: {
      positive: 2,
      negative: 3,
      neutral: 4,
      mixed: 5,
    },
  },
  {
    name: "Customer Service",
    total: 30,
    color: "#A367DB",
    sentiments: {
      positive: 6,
      negative: 7,
      neutral: 8,
      mixed: 9,
    },
  },
  {
    name: "Restaurant Ambiance",
    total: 46,
    color: "#DC8C67",
    sentiments: {
      positive: 10,
      negative: 11,
      neutral: 12,
      mixed: 13,
    },
  },
  {
    name: "Environment Cleanliness",
    total: 14,
    color: "#DDD267",
    sentiments: {
      positive: 2,
      negative: 3,
      neutral: 4,
      mixed: 5,
    },
  },
  {
    name: "Customer Retention",
    total: 14,
    color: "#DD6788",
    sentiments: {
      positive: 2,
      negative: 3,
      neutral: 4,
      mixed: 5,
    },
  },
  {
    name: "Staff Behavior",
    total: 46,
    color: "#A0DC67",
    sentiments: {
      positive: 10,
      negative: 11,
      neutral: 12,
      mixed: 13,
    },
  },
  {
    name: "Food Variety",
    total: 14,
    color: "#67DB76",
    sentiments: {
      positive: 2,
      negative: 3,
      neutral: 4,
      mixed: 5,
    },
  },
  {
    name: "Food Price",
    total: 14,
    color: "#DD67CE",
    sentiments: {
      positive: 2,
      negative: 3,
      neutral: 4,
      mixed: 5,
    },
  },
];

const CustomChart = () => {
  return (
    <div className="border shadow-sm mb-4 mt-4">
      <h3 className="bg-gray-200 px-4 text-md font-medium leading-8">
        Topic and Sentiments
      </h3>
      <div className="flex flex-wrap p-4 gap-4 bg-gray-100">
        <div className="basis-5/12 bg-white p-8 rounded">
          <div
            className="overflow-y-auto flex flex-col gap-y-4"
            style={{ height: "500px" }}
          >
            {topics.map((topic) => (
              <CustomBarChart key={topic.name} topic={topic} />
            ))}
          </div>
        </div>
        <div className="flex-1 p-2 bg-white rounded">
          <BubbleChartMock />
        </div>
      </div>
    </div>
  );
};

export default CustomChart;
