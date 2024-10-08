import { useAuthContext } from "../../contextApis/AuthContext";
import { extractTime } from "../../utils/extractTime";
import { useConversation } from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();

  const { selectedConversation } = useConversation();
  console.log(authUser);

  const fromMe = message?.senderId === authUser._id;

  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const chatClassName = fromMe ? "chat-end" : "chat-start";

  const bubbleBgColor = fromMe ? "bg-blue-700" : "bg-slate-600";

  const chatTime = extractTime(message.createdAt);
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={profilePic}
            alt="message avatar"
            className="h-12 w-12 rounded-full bg" // Adjust as needed
          />
        </div>{" "}
      </div>

      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2 `}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {chatTime}
      </div>
    </div>
  );
};

export default Message;
