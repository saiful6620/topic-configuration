import CustomTopics from "./components/CustomTopics";
import TopicContextProvider from "./context/TopicContextProvider";

const CustomTopicsPage = () => {
  return (
    <TopicContextProvider>
      <CustomTopics />
    </TopicContextProvider>
  );
};

export default CustomTopicsPage;
