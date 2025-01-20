import { ITopic } from "../types";
import styles from "./Topic.module.css";
import SubTopic from "./SubTopicList";
import { ChevronRight } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useCustomTopicContext } from "../context/TopicContext";
import { useDroppable } from "@dnd-kit/core";
import BulkAction from "./BulkAction";

interface TopicsProps {
  topic: ITopic;
}

const Topic = ({ topic }: TopicsProps) => {
  const {
    state: { selected },
    dispatch,
  } = useCustomTopicContext();
  const topicNameInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [topicName, setTopicName] = useState(topic.name);
  const { isOver, setNodeRef } = useDroppable({
    id: `${topic.topic_id}_topic`,
    data: { topicId: topic.topic_id },
  });
  const style: CSSProperties = {
    backgroundColor: isOver ? "green" : undefined,
  };

  const handleTopicNameChange = () => {
    dispatch({
      type: "EDIT_TOPIC_NAME",
      payload: {
        topic_id: topic.topic_id,
        name: topicName,
      },
    });
    setIsEditing(false);
  };

  const openEditTopicName = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing) {
      topicNameInputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className={styles.topicContainer}>
      <div
        className={styles.topicHeaderWrapper}
        style={{
          backgroundColor:
            selected.topic_id === topic.topic_id ? "#404040" : undefined,
          color: selected.topic_id === topic.topic_id ? "white" : undefined,
        }}
      >
        <ChevronRight size={24} />
        <div className={styles.topicHeader}>
          <div
            style={{ display: "inline-block" }}
            onDoubleClick={openEditTopicName}
          >
            <p
              style={{
                display: isEditing ? "none" : "inline-block",
                margin: "0px",
                fontSize: "14px",
                lineHeight: "21px",
                cursor: "pointer",
              }}
            >
              {topic.name}
            </p>
            <input
              style={{ display: isEditing ? "block" : "none" }}
              type="text"
              value={topicName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTopicName(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  handleTopicNameChange();
                }
              }}
              onBlur={handleTopicNameChange}
              ref={topicNameInputRef}
            />
          </div>
          {selected.topic_id === topic.topic_id ? <BulkAction /> : null}
        </div>
      </div>
      <div ref={setNodeRef} style={{ ...style, minHeight: "10px" }}>
        <SubTopic topicId={topic.topic_id} subTopicIds={topic.sub_topic_ids} />
      </div>
    </div>
  );
};

export default Topic;
