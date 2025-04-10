import BubbleChartMock from "../../components/bubble-chart/BubbleChartMock";
import CustomChart from "../../components/custom-chart/CustomChart";
import SentimentSummary from "../../components/sentiment-summary/SentimentSummary";
import CustomTopics from "./components/CustomTopics";
import TopicContextProvider from "./context/TopicContextProvider";

const CustomTopicsPage = () => {
  return (
    <TopicContextProvider>
      <CustomChart />
      <SentimentSummary />
      {/* <CustomTopics /> */}
    </TopicContextProvider>
  );
};

export default CustomTopicsPage;
