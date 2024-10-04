import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }
        console.log("Fetch users:", data);
        setConversation(data);
      } catch (error) {
        console.log("err while fetching all user");
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversation };
};

export default useGetConversation;
