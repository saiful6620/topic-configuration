import { color } from "d3";
import BubbleChartMock from "../bubble-chart/BubbleChartMock";
import CustomBarChart from "./CustomBarChart";

const colors = [
  "#B58FC2",
  "#A778B4",
  "#6F4C9B",
  "#6059A9",
  "#4D8AC6",
  "#60AB9E",
  "#A6BE54",
  "#E78C35",
  "#DF4828",
  "#DA2222",
];

const topics = [
  {
    name: "Food Quality",
    total: 19,
    color: colors[0],
    sentiments: {
      veryPositive: 2,
      positive: 2,
      veryNegative: 3,
      negative: 3,
      mixed: 5,
      neutral: 4,
    },
  },
  {
    name: "Customer Service",
    total: 35,
    color: colors[1],
    sentiments: {
      veryPositive: 2,
      positive: 6,
      veryNegative: 3,
      negative: 7,
      mixed: 9,
      neutral: 8,
    },
  },
  {
    name: "Restaurant Ambiance",
    total: 51,
    color: colors[2],
    sentiments: {
      veryPositive: 2,
      positive: 10,
      veryNegative: 3,
      negative: 11,
      mixed: 13,
      neutral: 12,
    },
  },
  {
    name: "Environment Cleanliness",
    total: 19,
    color: colors[3],
    sentiments: {
      veryPositive: 2,
      positive: 2,
      veryNegative: 3,
      negative: 3,
      mixed: 5,
      neutral: 4,
    },
  },
  {
    name: "Customer Retention",
    total: 19,
    color: colors[4],
    sentiments: {
      veryPositive: 2,
      positive: 2,
      veryNegative: 3,
      negative: 3,
      mixed: 5,
      neutral: 4,
    },
  },
  {
    name: "Staff Behavior",
    total: 51,
    color: colors[5],
    sentiments: {
      veryPositive: 2,
      positive: 10,
      veryNegative: 3,
      negative: 11,
      mixed: 13,
      neutral: 12,
    },
  },
  {
    name: "Food Variety",
    total: 19,
    color: colors[6],
    sentiments: {
      veryPositive: 2,
      positive: 2,
      veryNegative: 3,
      negative: 3,
      mixed: 5,
      neutral: 4,
    },
  },
  {
    name: "Food Price",
    total: 19,
    color: colors[7],
    sentiments: {
      veryPositive: 2,
      positive: 2,
      veryNegative: 3,
      negative: 3,
      mixed: 5,
      neutral: 4,
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
