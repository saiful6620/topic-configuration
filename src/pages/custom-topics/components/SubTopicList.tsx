import styles from "./SubTopic.module.css";
import SubTopic from "./SubTopic";
import { useCustomTopicContext } from "../context/TopicContext";

interface SubTopicProps {
  subTopicIds: string[];
  topicId: number | string;
}

const SubTopicList = ({ subTopicIds, topicId }: SubTopicProps) => {
  const {
    state: { sub_topics },
  } = useCustomTopicContext();

  return (
    <div className={styles.subTopicsList}>
      {subTopicIds.map((id) => (
        <SubTopic
          key={sub_topics[id].sub_topic_id}
          subTopic={sub_topics[id]}
          topicId={topicId}
        />
      ))}
    </div>
  );
};

export default SubTopicList;
