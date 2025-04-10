import React from "react";
import SemiCircleChart from "./components/SemiCircleChart";

const SentimentSummary = () => {
  return (
    <div className="border rounded p-4 bg-white my-4">
      <div className="px-4">
        <h6 className="text-md font-semibold">Sentiment Summary</h6>
        <p className="text-sm">This is the sentiment summary page</p>
      </div>
      <div className="w-full border-b border-gray-200 my-4"></div>
      <SemiCircleChart />
    </div>
  );
};

export default SentimentSummary;
