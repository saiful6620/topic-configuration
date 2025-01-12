import React, { useEffect, useRef, useState } from "react";
import { ISubTopic } from "../types";
import styles from "./SubTopic.module.css";
import { useCustomTopicContext } from "../context/TopicContext";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

interface SubTopicProps {
  subTopic: ISubTopic;
  topicId: number | string;
}

const SubTopic = ({ subTopic, topicId }: SubTopicProps) => {
  const {
    state: { selectedSubTopicId },
    dispatch,
  } = useCustomTopicContext();
  const [isEditing, setIsEditing] = useState(false);
  const [subTopicName, setSubTopicName] = useState(subTopic.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } =
    useDraggable({
      id: `${topicId}_${subTopic.sub_topic_id}_subTopic`,
      data: { topicId, subTopicId: subTopic.sub_topic_id },
      disabled: isEditing,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  // const selectedStyle = selectedSubTopicId.includes(
  //   subTopic.sub_topic_id as string
  // )
  //   ? { backgroundColor: "red" }
  //   : undefined;

  const handleSubTopicNameChange = () => {
    dispatch({
      type: "EDIT_SUB_TOPIC_NAME",
      payload: {
        topic_id: topicId,
        sub_topic_id: subTopic.sub_topic_id,
        name: subTopicName,
      },
    });
    setIsEditing(false);
  };

  const openEditSubTopicName = () => {
    setIsEditing(true);
  };

  const toggleSubTopicSelection = (subTopicId: string) => {
    dispatch({
      type: "SELECT_UNSELECT_SUB_TOPIC",
      payload: subTopicId,
    });
  };

  useEffect(() => {
    if (isEditing) {
      console.log(inputRef.current);
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        // ...selectedStyle,
      }}
      className={styles.subTopic}
    >
      {!isEditing && (
        <button
          className={styles.dragHandle}
          {...listeners}
          {...attributes}
          ref={setActivatorNodeRef}
        >
          <GripVertical size={16} />
        </button>
      )}
      <p
        onClick={() => toggleSubTopicSelection(subTopic.sub_topic_id as string)}
        onDoubleClick={openEditSubTopicName}
        style={{
          display: isEditing ? "none" : "block",
          margin: "0px",
          padding: "8px",
        }}
      >
        {subTopic.name}
      </p>
      <input
        style={{
          display: isEditing ? "block" : "none",
        }}
        type="text"
        value={subTopicName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSubTopicName(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleSubTopicNameChange();
          }
        }}
        onBlur={handleSubTopicNameChange}
        ref={inputRef}
      />
    </div>
  );
};

export default SubTopic;
