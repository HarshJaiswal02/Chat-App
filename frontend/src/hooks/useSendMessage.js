import { useState } from "react";
import { useConversation } from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    console.log(typeof message);
    if (!selectedConversation?._id) {
      console.error("No conversation selected.");
      throw new Error("No conversation selected.");
    }
    try {
      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      console.log(data);
      if (data.error) {
        console.error(`Error occurred: ${data.error}`); // Log the actual error
        throw new Error(data.error); // Ensure a meaningful error message
      }
    //   console.log("After error");
      setMessages([...messages, data]);
    //   console.log(messages);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
