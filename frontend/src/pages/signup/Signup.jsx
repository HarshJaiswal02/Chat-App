import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const { loading, signup } = useSignup();

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    const res = await signup(input);
    console.log(res);
  };

  const handleCheckboxChange = (gender) => {
    setInput({ ...input, gender });
  };
  return (
    <div className=" flex rounded backdrop-blur-sm bg-opacity-50 border border-gray-100 backdrop-filter">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Signup to <span className="text-gray-300 font-medium"> CHAT</span>
          </h1>
        </div>
        <p>
          Welcome! You’re not just a user; you’re part of our community now! 🌼
        </p>
        <form
          onSubmit={handleSignInSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter FullName"
                value={input.fullName}
                onChange={(e) => {
                  setInput({ ...input, fullName: e.target.value });
                }}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6" // Adjust height and width as needed
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                  <path d="M12 14c-4.97 0-9 4.03-9 9h18c0-4.97-4.03-9-9-9z" />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Username"
                value={input.username}
                onChange={(e) => {
                  setInput({ ...input, username: e.target.value });
                }}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6" // Adjust height and width as needed
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                  <path d="M12 14c-4.97 0-9 4.03-9 9h18c0-4.97-4.03-9-9-9z" />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Email"
                value={input.email}
                onChange={(e) => {
                  setInput({ ...input, email: e.target.value });
                }}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6" // Adjust height and width as needed
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Password"
                value={input.password}
                onChange={(e) => {
                  setInput({ ...input, password: e.target.value });
                }}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Confirm Password"
                value={input.confirmPassword}
                onChange={(e) => {
                  setInput({ ...input, confirmPassword: e.target.value });
                }}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <GenderCheckbox
              onCheckboxChange={handleCheckboxChange}
              selectedGender={input.gender}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm">
              Already have account?{" "}
              <Link className="underline" to={"/login"}>
                Login
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="inline-block rounded-lg bg-gray-500 px-5 py-3 text-sm font-medium min-w-full"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
