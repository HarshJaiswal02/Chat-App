import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";

const MessageInput = () => {
  const { loading, sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");
  // console.log(sendMessage);
  const handleMessageSend = async (e) => {
    e.preventDefault();

    if (!message) {
      console.log("No message Typed");
      return;
    }
    await sendMessage(message);
    setMessage("");
    console.log(message);
  };
  return (
    <form className="px-4 my-3" onSubmit={handleMessageSend}>
      <div className="w-full flex items-center gap-3">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend className="size-6" />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
