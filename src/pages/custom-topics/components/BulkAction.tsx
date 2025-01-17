import React from "react";
import { ChevronRight, Merge, Move, Trash, XCircle } from "lucide-react";
import { useCustomTopicContext } from "../context/TopicContext";

const BulkAction = () => {
  const { dispatch } = useCustomTopicContext();
  return (
    <div style={{ display: "flex", marginLeft: "auto", gap: "8px" }}>
      <button>
        <Move size={16} />
      </button>
      <button>
        <Merge size={16} />
      </button>
      <button onClick={() => dispatch({ type: "DELETE_SUB_TOPIC" })}>
        <Trash size={16} />
      </button>
      <button>
        <XCircle
          size={16}
          onClick={() => dispatch({ type: "RESET_SELECTED" })}
        />
      </button>
    </div>
  );
};

export default BulkAction;
