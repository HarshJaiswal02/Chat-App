import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contextApis/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    email,
    gender,
  }) => {
    const success = handleInputError({
      fullName,
      username,
      password,
      confirmPassword,
      email,
      gender,
    });
    if (!success) return;
    console.log("Data", success);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          email,
          gender,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }

      //Saving the data in localStorage
      localStorage.setItem("chat-user", JSON.stringify(data));

      //context (sync the data flow)
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
const handleInputError = ({
  fullName,
  username,
  password,
  confirmPassword,
  email,
  gender,
}) => {
  username = username.trim();
  if (
    !fullName ||
    !username ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender
  ) {
    console.log("Some field is missing");
    toast.error("Please fill all the given entries");
    return false;
  }

  if (password !== confirmPassword) {
    console.log("Mismatch password and confirmPassword");
    toast.error("Password and confirmPassword are not equal");
    return false;
  }

  if (password.length < 8) {
    console.log("Password length is less the 8 character");
    toast.error("Password must above at least  8 character");
    return false;
  }
  return true;
};

export default useSignup;
