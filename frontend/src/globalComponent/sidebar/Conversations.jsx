import useGetConversation from "../../hooks/useGetConversation";
import { getEmoji } from "../../utils/emoji";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversation } = useGetConversation();
  console.log("inside conversation array", conversation);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {/* <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation /> */}

      {conversation.map((data, index) => (
        <Conversation
          key={data._id}
          data={data}
          lastIndex={index === conversation.length - 1}
          emoji={getEmoji()}
        />
      ))}
      {loading ? <div className="loading loading-spinner"></div> : null}
    </div>
  );
};
export default Conversations;
