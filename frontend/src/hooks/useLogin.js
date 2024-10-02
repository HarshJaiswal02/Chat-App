import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contextApis/AuthContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async ({ username, password }) => {
    const success = handleInputError({ username, password });

    if (!success) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("Data", data);
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

const handleInputError = ({ username, password }) => {
  if (!username || !password) {
    toast.error("Fill all the entries");
    return false;
  }
  if (password.length < 7) {
    toast.error("Password must contain atleast  8 characters");
    return false;
  }
  return true;
};
