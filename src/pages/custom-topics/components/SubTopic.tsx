import React, { useEffect, useRef, useState } from "react";
import { ISubTopic } from "../types";
import styles from "./SubTopic.module.css";
import { useCustomTopicContext } from "../context/TopicContext";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical, XCircle } from "lucide-react";

interface SubTopicProps {
  subTopic: ISubTopic;
  topicId: number | string;
}

const SubTopic = ({ subTopic, topicId }: SubTopicProps) => {
  const [clickTimeout, setClickTimeout] = useState<number | null>(null);
  const {
    state: { selected },
    dispatch,
  } = useCustomTopicContext();
  const [isEditing, setIsEditing] = useState(false);
  const [subTopicName, setSubTopicName] = useState(subTopic.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } =
    useDraggable({
      id: `${topicId}_${subTopic.sub_topic_id}_subTopic`,
      data: { topicId, subTopicId: subTopic.sub_topic_id },
      disabled: isEditing || selected.sub_topic_ids.length > 0,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 10,
        backgroundColor: "gray",
        color: "white",
      }
    : undefined;

  const selectedStyle = selected.sub_topic_ids.includes(
    subTopic.sub_topic_id as string
  )
    ? { backgroundColor: "darkgray", color: "white" }
    : undefined;

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

  const toggleSubTopicSelection = () => {
    dispatch({
      type: "SELECT_UNSELECT_SUB_TOPIC",
      payload: {
        sub_topic_id: subTopic.sub_topic_id,
        topic_id: topicId,
      },
    });
  };

  const openEditSubTopicName = () => {
    if (
      selected.sub_topic_ids.includes(subTopic.sub_topic_id as string) ||
      isEditing
    )
      return;
    setIsEditing(true);
  };

  const handleSubTopicClick = (): void => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      openEditSubTopicName();
    } else {
      const timeout = setTimeout(() => {
        toggleSubTopicSelection();
        setClickTimeout(null);
      }, 200);
      setClickTimeout(timeout);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        ...selectedStyle,
      }}
      className={styles.subTopic}
      onClick={handleSubTopicClick}
    >
      {!isEditing && selected.topic_id === null && (
        <button
          className={`${styles.subTopicActionButton} ${styles.dragHandle}`}
          {...listeners}
          {...attributes}
          ref={setActivatorNodeRef}
        >
          <GripVertical size={16} />
        </button>
      )}
      <div className={styles.subTopicNameWrapper}>
        <p
          className={
            selected.topic_id === null
              ? styles.subTopicNameTrasition
              : styles.subTopicName
          }
          style={{
            display: isEditing ? "none" : "block",
          }}
        >
          {subTopic.name}
        </p>
        <input
          className={styles.subTopicInput}
          style={{
            display: isEditing ? "inline-block" : "none",
            // display: "inline-block",
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
      {!isEditing && selected.topic_id === null && (
        <button
          className={`${styles.subTopicActionButton} ${styles.subTopicDeleteButton}`}
          onClick={(e) => e.stopPropagation()}
        >
          <XCircle size={16} />
        </button>
      )}
    </div>
  );
};

export default SubTopic;
