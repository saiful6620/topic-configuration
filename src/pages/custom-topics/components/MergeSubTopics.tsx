import { useId, useState } from "react";
import { useCustomTopicContext } from "../context/TopicContext";

interface MergeSubTopicsProps {
  close: () => void;
}

const MergeSubTopics = ({ close }: MergeSubTopicsProps) => {
  const [name, setName] = useState<string>("");
  const id = useId();
  const { state, dispatch } = useCustomTopicContext();
  const handleMergeSubTopic = () => {
    if (!name) return;
    console.log(id);
    dispatch({
      type: "MERGE_SUB_TOPIC",
      payload: {
        id,
        name,
      },
    });
    close();
  };
  console.log(state);
  return (
    <div>
      <p className="mb-1">Name of the merged sub-topic</p>
      <input
        className="w-full text-[#555555] text-sm p-1 border-b border-b-gray-500 focus:outline-none focus:border-b-blue-400 focus:bg-gray-100"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex gap-4 flex-row-reverse p-4">
        <button
          className="bg-blue-600 text-white text-sm px-8 p-1"
          onClick={handleMergeSubTopic}
        >
          Save
        </button>
        <button
          className="bg-gray-300 text-[#3a3a3a] text-sm px-8 p-1"
          onClick={close}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MergeSubTopics;
