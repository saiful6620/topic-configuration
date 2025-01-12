import { CustomTopicAction, ITopicData } from "../types";

export const initialState: ITopicData = {
  topicIds: [],
  topics: {},
  sub_topics: {},
  selectedSubTopicId: [],
};

export const customTopicReducer = (
  state: ITopicData,
  action: CustomTopicAction
) => {
  switch (action.type) {
    case "INITIALIZE_API_DATA":
      return {
        ...action.payload,
        selectedSubTopicId: [],
      };
    case "EDIT_TOPIC_NAME":
      const { topic_id, name: topic_name } = action.payload;
      return {
        ...state,
        topics: {
          ...state.topics,
          [topic_id]: {
            ...state.topics[topic_id],
            name: topic_name,
          },
        },
      };
    case "EDIT_SUB_TOPIC_NAME":
      const { sub_topic_id, name: sub_topic_name } = action.payload;
      return {
        ...state,
        sub_topics: {
          ...state.sub_topics,
          [sub_topic_id]: {
            ...state.sub_topics[sub_topic_id],
            name: sub_topic_name,
          },
        },
      };

    case "DROP_SUB_TOPIC":
      const { source_id, target_id, item_id } = action.payload;
      const sourceTopic = { ...state.topics[source_id] };
      const targetTopic = { ...state.topics[target_id] };
      sourceTopic.sub_topic_ids = sourceTopic.sub_topic_ids.filter(
        (id) => id !== item_id
      );
      targetTopic.sub_topic_ids = targetTopic.sub_topic_ids.concat([
        item_id as string,
      ]);
      return {
        ...state,
        topics: {
          ...state.topics,
          [source_id]: sourceTopic,
          [target_id]: targetTopic,
        },
      };

    case "SELECT_UNSELECT_SUB_TOPIC":
      const selectedSubTopicId = [...state.selectedSubTopicId];
      const newSelectedSubTopicId = selectedSubTopicId.concat([
        action.payload as string,
      ]);
      console.log(Array.from(new Set(newSelectedSubTopicId)));
      return {
        ...state,
        selectedSubTopicId: Array.from(new Set(newSelectedSubTopicId)),
      };

    default:
      return state;
  }
};
