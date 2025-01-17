import { useReducer } from "react";
import {
  customTopicReducer,
  initialState,
} from "../reducer/custom-topic-reducer";
import { TopicContext } from "./TopicContext";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { ITopicDataApiData } from "../types";

interface TopicContextProviderProps {
  children: React.ReactNode;
}

const TopicContextProvider = ({ children }: TopicContextProviderProps) => {
  const [state, dispatch] = useReducer(customTopicReducer, initialState);
  useQuery(["topics"], () => axios.get("http://localhost:3001/data"), {
    onSuccess: (data: AxiosResponse<ITopicDataApiData>) => {
      dispatch({ type: "INITIALIZE_API_DATA", payload: data.data });
    },
    onError: (error: AxiosError<Error>) => {
      console.log(error);
    },
  });

  return (
    <TopicContext.Provider value={{ state, dispatch }}>
      {children}
    </TopicContext.Provider>
  );
};

export default TopicContextProvider;
