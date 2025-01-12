import { useCustomTopicContext } from "../context/TopicContext";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Topic from "./Topic";

const CustomTopics = (): JSX.Element | null => {
  const { state, dispatch } = useCustomTopicContext();
  if (state.topicIds.length === 0) return null;

  const onDragEnd = (event: DragEndEvent) => {
    if (!event.over || !event.active) return;

    const sourceData = event.active.data.current;
    const targetData = event.over.data.current;
    if (!sourceData || !targetData) return;
    if (sourceData.topicId === targetData.topicId) return;

    console.log(sourceData, targetData);

    dispatch({
      type: "DROP_SUB_TOPIC",
      payload: {
        source_id: sourceData.topicId,
        target_id: targetData.topicId,
        item_id: sourceData.subTopicId,
      },
    });
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div>
        {state.topicIds.map((topicId) => (
          <Topic
            key={state.topics[topicId].topic_id}
            topic={state.topics[topicId]}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default CustomTopics;
