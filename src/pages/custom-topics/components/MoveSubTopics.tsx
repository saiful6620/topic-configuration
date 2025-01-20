import { useEffect, useState } from "react";
import { useCustomTopicContext } from "../context/TopicContext";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { ITopic } from "../types";

interface MoveSubTopicsProps {
  close: () => void;
}

const MoveSubTopics = ({ close }: MoveSubTopicsProps) => {
  const { state, dispatch } = useCustomTopicContext();
  const [selected, setSelected] = useState<ITopic | null>(null);
  const [options, setOptions] = useState<ITopic[]>([]);

  const handleMoveSubTopic = () => {
    if (!selected) return;
    dispatch({
      type: "MOVE_SUB_TOPIC",
      payload: {
        target_id: selected.topic_id,
      },
    });
    close();
  };

  useEffect(() => {
    const topics = Object.values(state.topics).filter(
      (topic) => topic.topic_id !== state.selected.topic_id
    );
    setOptions(topics);
  }, [state.topics]);

  return (
    <div>
      <p className="text-sm mb-2">Selected sub-topics</p>
      <div className="flex gap-2 flex-wrap">
        {state.selected.sub_topic_ids.map((id) => (
          <p key={id} className="text-sm bg-gray-300 px-4 py-0.5">
            {state.sub_topics[id].name}
          </p>
        ))}
      </div>
      <div className="w-full pt-8">
        <Listbox value={selected} onChange={setSelected}>
          <ListboxButton className="relative block w-full bg-white py-1.5 pr-4 pl-0 text-left text-sm/6 border-b-gray-500 hover:border-b-blue-400 focus:outline-none focus:border-b-blue-400">
            {selected ? selected.name : "Select a topic"}
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className="w-[var(--button-width)] rounded mt-0.5 shadow-xl bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          >
            {options?.map((topic) => (
              <ListboxOption
                key={topic.topic_id}
                value={topic}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-sm/6">{topic.name}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
      <div className="flex gap-4 flex-row-reverse p-4">
        <button
          className="bg-blue-600 text-white text-sm px-8 p-1"
          onClick={handleMoveSubTopic}
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

export default MoveSubTopics;
