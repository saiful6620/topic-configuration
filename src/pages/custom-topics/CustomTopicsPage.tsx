import BubbleChartExample from "../../components/bubble-chart/BubbleChart";
import CustomTopics from "./components/CustomTopics";
import TopicContextProvider from "./context/TopicContextProvider";

const CustomTopicsPage = () => {
  return (
    <TopicContextProvider>
      <div>
        <BubbleChartExample />
      </div>
      <CustomTopics />
    </TopicContextProvider>
  );
};

export default CustomTopicsPage;
