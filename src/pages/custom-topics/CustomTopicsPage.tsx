import BubbleChartMock from "../../components/bubble-chart/BubbleChartMock";
import CustomChart from "../../components/custom-chart/CustomChart";
import CustomTopics from "./components/CustomTopics";
import TopicContextProvider from "./context/TopicContextProvider";

const CustomTopicsPage = () => {
  return (
    <TopicContextProvider>
      <CustomChart />
      <CustomTopics />
    </TopicContextProvider>
  );
};

export default CustomTopicsPage;
