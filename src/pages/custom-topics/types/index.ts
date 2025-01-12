export interface ITopic {
  topic_id: number | string;
  name: string;
  sub_topic_ids: string[];
}

export interface ISubTopic {
  sub_topic_id: number | string;
  name: string;
}

export interface ITopicData {
  topicIds: string[];
  topics: {
    [key: string]: ITopic;
  };
  sub_topics: {
    [key: string]: ISubTopic;
  };
  selectedSubTopicId: string[];
}

export type CustomTopicAction =
  | {
      type: "INITIALIZE_API_DATA";
      payload: ITopicData;
    }
  | {
      type: "EDIT_TOPIC_NAME";
      payload: {
        topic_id: number | string;
        name: string;
      };
    }
  | {
      type: "EDIT_SUB_TOPIC_NAME";
      payload: {
        topic_id: number | string;
        sub_topic_id: number | string;
        name: string;
      };
    }
  | {
      type: "REMOVE_TOPIC";
      payload: number;
    }
  | {
      type: "DROP_SUB_TOPIC";
      payload: {
        source_id: number | string;
        target_id: number | string;
        item_id: number | string;
      };
    }
  | {
      type: "SELECT_UNSELECT_SUB_TOPIC";
      payload: number | string;
    };
