import { CustomTopicAction, ITopicData } from "../types";

export const initialState: ITopicData = {
  topicIds: [],
  topics: {},
  sub_topics: {},
  selected: {
    sub_topic_ids: [],
    topic_id: null,
  },
};

export const customTopicReducer = (
  state: ITopicData,
  action: CustomTopicAction
): ITopicData => {
  switch (action.type) {
    case "INITIALIZE_API_DATA":
      return {
        ...action.payload,
        selected: {
          sub_topic_ids: [],
          topic_id: null,
        },
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
      const { sub_topic_id: subTopicId, topic_id: topicId } = action.payload;

      if (
        state.selected.topic_id !== null &&
        state.selected.topic_id !== topicId
      ) {
        return state;
      }
      const selectedSubTopicId = [...state.selected.sub_topic_ids];
      const indexOfItem = selectedSubTopicId.indexOf(subTopicId as string);
      if (indexOfItem === -1) {
        selectedSubTopicId.push(subTopicId as string);
      } else {
        selectedSubTopicId.splice(indexOfItem, 1);
      }

      return {
        ...state,
        selected: {
          sub_topic_ids: selectedSubTopicId,
          topic_id: selectedSubTopicId.length > 0 ? topicId : null,
        },
      };

    case "DELETE_SUB_TOPIC":
      const { sub_topic_ids, topic_id: parentTopicId } = state.selected;
      if (sub_topic_ids.length === 0 || !parentTopicId) return state;
      const topic = { ...state.topics[parentTopicId] };
      topic.sub_topic_ids = topic.sub_topic_ids.filter(
        (id) => !sub_topic_ids.includes(id)
      );
      return {
        ...state,
        topics: {
          ...state.topics,
          [parentTopicId]: topic,
        },
        selected: {
          sub_topic_ids: [],
          topic_id: null,
        },
      };

    case "RESET_SELECTED":
      return {
        ...state,
        selected: {
          sub_topic_ids: [],
          topic_id: null,
        },
      };

    default:
      return state;
  }
};
