import { Merge, Move, Trash, XCircle } from "lucide-react";
import { useCustomTopicContext } from "../context/TopicContext";

const BulkAction = () => {
  const { dispatch } = useCustomTopicContext();
  return (
    <div style={{ display: "flex", marginLeft: "auto", gap: "4px" }}>
      <button className="text-sm px-4 py-1 h-6 transition-colors hover:bg-[#555555]">
        <Move size={16} /> <span className="ml-2">Move</span>
      </button>
      <button className="text-sm px-4 py-1 h-6 transition-colors hover:bg-[#555555]">
        <Merge size={16} /> <span className="ml-2">Merge</span>
      </button>
      <button
        className="text-sm px-4 py-1 h-6 transition-colors hover:bg-[#555555]"
        onClick={() => dispatch({ type: "DELETE_SUB_TOPIC" })}
      >
        <Trash size={16} /> <span className="ml-2">Delete</span>
      </button>
      <button
        className="text-sm px-4 py-1 h-6 transition-colors hover:bg-[#555555]"
        onClick={() => dispatch({ type: "RESET_SELECTED" })}
      >
        <XCircle size={16} />
        <span className="ml-2">Reset</span>
      </button>
    </div>
  );
};

export default BulkAction;
