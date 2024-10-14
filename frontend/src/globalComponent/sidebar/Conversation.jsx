import { useSocketContext } from "../../contextApis/SocketContext";
import { useConversation } from "../../zustand/useConversation";

const Conversation = ({ conversation, emoji, lastIndex }) => {
  // console.log(data);
  // console.log(emoji);
  const { selectedConversation, setSelectedConversation } = useConversation();

  console.log(selectedConversation);

  let isSelected = selectedConversation?._id === conversation ._id;

  const { onlineUsers } = useSocketContext();
  console.log(onlineUsers);
  console.log(conversation);

  const isOnline = onlineUsers?.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center ${
          isSelected ? "" : "hover:bg-slate-600"
        } rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-600" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={conversation.profilePic}
              alt="User Avatar"
              className="h-12 w-12 rounded-full"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.username}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIndex ? <div className="divider my-0 py-0 h-1" /> : null}
    </>
  );
};
export default Conversation;
