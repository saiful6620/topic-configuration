import { ITopic } from "../types";
import styles from "./Topic.module.css";
import SubTopic from "./SubTopicList";
import { ChevronRight } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useCustomTopicContext } from "../context/TopicContext";
import { useDroppable } from "@dnd-kit/core";

interface TopicsProps {
  topic: ITopic;
}

const Topic = ({ topic }: TopicsProps) => {
  const { dispatch } = useCustomTopicContext();
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
    <div>
      <div className={styles.topicHeader}>
        <ChevronRight size={24} />
        <div
          style={{ display: "inline-block", backgroundColor: "orange" }}
          onDoubleClick={openEditTopicName}
        >
          <p
            style={{
              display: isEditing ? "none" : "inline-block",
              margin: "0px",
              padding: "8px",
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
      </div>
      <div ref={setNodeRef} style={{ ...style, minHeight: "10px" }}>
        <SubTopic topicId={topic.topic_id} subTopicIds={topic.sub_topic_ids} />
      </div>
    </div>
  );
};

export default Topic;
