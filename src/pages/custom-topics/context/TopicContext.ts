import { createContext, useContext } from "react";
import { CustomTopicAction, ITopicData } from "../types";

interface TopicContextType {
  state: ITopicData;
  dispatch: React.Dispatch<CustomTopicAction>;
}

export const TopicContext = createContext<TopicContextType | null>(null);

// Custom hook to use the global state
export const useCustomTopicContext = (): TopicContextType => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error(
      "useCustomTopicContext must be used within a CustomTopic context provider"
    );
  }
  return context;
};
