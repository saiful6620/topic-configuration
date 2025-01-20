import { Merge, Move, Trash, XCircle } from "lucide-react";
import { useCustomTopicContext } from "../context/TopicContext";
import { Fragment } from "react/jsx-runtime";
import Modal from "../../../components/modal/Modal";
import { useDisclosure } from "../../../hooks/useDisclosure";
import MoveSubTopics from "./MoveSubTopics";

const BulkAction = () => {
  const { dispatch } = useCustomTopicContext();
  const { isOpen, open, close } = useDisclosure(false);
  return (
    <Fragment>
      <div style={{ display: "flex", marginLeft: "auto", gap: "4px" }}>
        <button
          className="text-sm px-4 py-1 h-6 transition-colors hover:bg-[#555555]"
          onClick={open}
        >
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
      <Modal isOpen={isOpen} close={close}>
        <MoveSubTopics close={close} />
      </Modal>
    </Fragment>
  );
};

export default BulkAction;
